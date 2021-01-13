import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import dotenv from "dotenv";

dotenv.config();

const { PORT, NODE_ENV, API_CONN } = process.env;
const dev = NODE_ENV === "development";

const app = polka().use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
        session: (req, res) => ({
            api: API_CONN,
        }),
    })
);
app.listen(PORT, (err) => {
    if (err) console.log("error", err);
});
