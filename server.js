const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const polka = require("polka");
const cors = require("cors");

dotenv.config();

const { DB_CONN, CORS_ORIGINS } = process.env;

const corsWhitelist = JSON.parse(CORS_ORIGINS);

const client = new MongoClient(DB_CONN, { useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to database");

        polka()
            .use(
                cors({
                    origin: corsWhitelist,
                })
            )
            .get("/sample", (req, res) => {
                // get two random entries from the collection
                res.end(JSON.stringify({ testing: "yaya" }));
            })
            .get("/ranking/:page", (req, res) => {
                // get the current ranking by page
                res.end(JSON.stringify({ testing: "yaya" }));
            })
            .post("/vote", (req, res) => {
                // vote on a particular entry
                console.log("voted!");
                res.end();
            })
            .post("/unvote", (req, res) => {
                // remove a vote on a particular entry
                console.log("unvoted!");
                res.end();
            })
            .listen(5000, (err) => {
                if (err) throw err;
                console.log("Server running on port 5000");
            });
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
