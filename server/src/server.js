const { MongoClient, ObjectId } = require("mongodb");

const dotenv = require("dotenv");
// const polka = require("polka");
const express = require("express");
// const send = require("@polka/send-type");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const { DB_CONN, CORS_ORIGINS } = process.env;

const corsWhitelist = JSON.parse(CORS_ORIGINS || "[]");

const client = new MongoClient(DB_CONN, { useUnifiedTopology: true });

async function run() {
    await client.connect();
    console.log("Connected to database");

    const database = client.db("allDb");
    const overusedCollection = database.collection("overused");
    const underusedCollection = database.collection("underused");

    const corsConfig = cors({
        origin: corsWhitelist,
    });

    const rankTypeMiddleware = (req, res, next) => {
        if (req.query.rankType === "overused") {
            req.collection = overusedCollection;
        } else if (req.query.rankType === "underused") {
            req.collection = underusedCollection;
        } else {
            res.statusCode = 400;
            res.end("Missing valid rankType query");
        }

        next();
    };

    const app = express()
        .use(corsConfig)
        .use(bodyParser.json())
        .use(rankTypeMiddleware);

    // get two random entries
    app.get("/sample", async (req, res) => {

        const maxSamples = 10;
        const resultsArr = []

        let results = {}
        let tries = 0;

        // try to get a set of random things from the collection
        // we may have to try a few times since mongo's $sample can return the
        // same record multiple times
        while (tries < 20) {
            const sample = await req.collection
                .aggregate([{ $sample: { size: 1 } }])
                .toArray();

            if (!Object.keys(results).includes(sample[0]._id)) {
                results[sample[0]._id] = sample[0]
            }

            if (Object.keys(results).length === maxSamples) break;

            tries++;
        }

        for (const id in results) {
            resultsArr.push(results[id])
        }
        res.json({ items: resultsArr });
    });

    // get the latest ranking, paginated
    app.get("/ranking/:page", async (req, res) => {
        try {
            const items = [];

            // assemble the list of items
            const cursor = await req.collection
                .find(
                    {},
                    {
                        limit: 10,
                        skip: 10 * req.params.page,
                        sort: { votes: -1 },
                    }
                )
                .forEach((item) => {
                    items.push(item);
                });

            // get the total number of items in the collection
            const count = await req.collection.estimatedDocumentCount();
            const numPassed = 10 * req.params.page + 10;

            if (items.length === 0 && req.params.page > 0) {
                res.status(404).send("That page doesn't exist")
            } else {
                res.json({
                    items,
                    nextPage: count > numPassed,
                })
            }
        } catch {
            res.status(500).send()
        }
    });

    // add a vote to an entry
    app.post("/vote", async (req, res) => {
        try {
            const id = req.body.id;

            await req.collection.findOneAndUpdate(
                { _id: ObjectId(id) },
                { $inc: { votes: 1 } }
            );
        } catch {
            // fail silently
            res.status(200).send()
        }
        res.status(200).send()
    });

    // remove a vote from an entry
    app.post("/unvote", async (req, res) => {
        try {
            const id = req.body.id;

            const obj = await req.collection.findOne({ _id: ObjectId(id) });
            if (obj.votes > 0) {
                await req.collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $inc: { votes: -1 } }
                );
            }

        } catch {
            // fail silently
            res.status(200).send()
        }
        res.status(200).send()
    });

    // add an entry
    app.post("/new", async (req, res) => {
        try {
            const content = req.body.content;

            if (content === "") {
                throw new Error("New item has no content!");
            } else {
                const result = await req.collection.insertOne({
                    content: content,
                    votes: 1,
                });

                const id = result.insertedId;

                // return the newly created item ID
                res.json({ _id: id })
            }
        } catch {
            res.status(500).send()
        }
    });

    app.listen(5000, (err) => {
        if (err) throw err;
        console.log("Server running on port 5000");
    });
}
run().catch(console.dir);
