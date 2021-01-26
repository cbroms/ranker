const { MongoClient, ObjectId } = require("mongodb");

const dotenv = require("dotenv");
const polka = require("polka");
const send = require("@polka/send-type");
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

    const app = polka()
        .use(corsConfig)
        .use(bodyParser.json())
        .use(rankTypeMiddleware);

    app.options("*", cors());

    // get two random entries
    app.get("/sample", async (req, res) => {
        let thing1 = { _id: null };
        let thing2 = { _id: null };

        let tries = 0;

        // try to get two random things from the collection
        // we may have to try a few times since mongo's $sample can return the
        // same record multiple times
        while (tries < 10) {
            const sample = await req.collection
                .aggregate([{ $sample: { size: 1 } }])
                .toArray();

            if (thing1._id === null) thing1 = sample[0];
            else thing2 = sample[0];

            if (thing1._id !== thing2._id && thing2._id !== null) break;

            tries++;
        }
        res.end(JSON.stringify({ thing1, thing2 }));
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
                send(res, 404, "That page doesn't exist");
            } else {
                send(
                    res,
                    200,
                    JSON.stringify({
                        items,
                        nextPage: count > numPassed,
                    })
                );
            }
        } catch {
            send(res, 500);
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
            send(res, 200);
        }
        send(res, 200);
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
            send(res, 200);
        }
        send(res, 200);
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
                    votes: 0,
                });

                const id = result.insertedId;

                // return the newly created item ID
                send(res, 200, JSON.stringify({ _id: id }));
            }
        } catch {
            send(res, 500, "Something went wrong");
        }
    });

    app.listen(5000, (err) => {
        if (err) throw err;
        console.log("Server running on port 5000");
    });
}
run().catch(console.dir);
