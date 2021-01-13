const { MongoClient, ObjectId } = require("mongodb");

const dotenv = require("dotenv");
const polka = require("polka");
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
    const thingsCollection = database.collection("things");

    const app = polka()
        .use(
            cors({
                origin: corsWhitelist,
            })
        )
        .use(bodyParser.json());

    // get two random entries
    app.get("/sample", async (req, res) => {
        let thing1 = { _id: null };
        let thing2 = { _id: null };

        let tries = 0;

        // try to get two random things from the collection
        // we may have to try a few times since mongo's $sample can return the
        // same record multiple times
        while (tries < 10) {
            const sample = await thingsCollection
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
        const items = [];

        const cursor = await thingsCollection
            .find(
                {},
                { limit: 10, skip: 10 * req.params.page, sort: { votes: -1 } }
            )
            .forEach((item) => {
                items.push(item);
            });

        res.end(JSON.stringify({ items }));
    });

    // add a vote to an entry
    app.post("/vote", async (req, res) => {
        const id = req.body.id;

        const doc = await thingsCollection.findOneAndUpdate(
            { _id: ObjectId(id) },
            { $inc: { votes: 1 } }
        );
        res.end();
    });

    // remove a vote from an entry
    app.post("/unvote", async (req, res) => {
        const id = req.body.id;

        await thingsCollection.findOneAndUpdate(
            { _id: ObjectId(id) },
            { $inc: { votes: -1 } }
        );

        res.end();
    });

    // add an entry
    app.post("/new", async (req, res) => {
        const result = await thingsCollection.insertOne({
            content: req.body.content,
            votes: 1,
        });
        res.end();
    });

    app.listen(5000, (err) => {
        if (err) throw err;
        console.log("Server running on port 5000");
    });
}
run().catch(console.dir);
