# Phrase Ranking

Ranking phrases that are under and overused.

The client is built with Sapper (Svelte) and the backend is a Polka (Node) server. The database is MongoDB.

## Development

Create a `.env` file that contains:

```
DB_CONN= { your MongoDB connection string }
CORS_ORIGINS=["http://localhost:3000", { any other origins you'd like to whitelist } ]
API_CONN=http://localhost:5000
```

If you're on linux, you can run both the client and server in development mode with docker:

```
docker-compose up
```

Changes made the the source of either the client or server will be live reloaded in their respective docker containers.

If you're on MacOS, you won't be able to use docker compose because of [this open issue](https://github.com/docker/for-mac/issues/1031). You'll need to run the client and server manually, by entering both the `client` and `server` directories and running:

```
npm install
npm run dev
```

Note that you'll also need to create separate `.env` files in both directories as well, rather than at the repository root directory. `DB_CONN` and `CORS_ORIGINS` should be present in the `.env` file for the server, and `API_CONN` should be present in the client `.env` file.
