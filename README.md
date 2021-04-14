# Clients and providers

In development, we run server and client separately.

In production, server serves built client from dist folder.

To test database operations locally, please install MongoDB.

Before running the app, please ensure that your MongoDB server is up.

Docs generated with swagger is located at `/api-docs` on the server

## Project setup for development

Make sure that `NODE_ENV` environment variable is set like this:
`NODE_ENV=development`

```
cp .env-example .env
```

Make sure to configure valid `MONGODB_URL`

```
npm install
```

### Compiles and hot-reloads for development both server and client

```
npm run all
```

### You can run server and client separately with following commands

```
npm run server
npm run client
```

## Run in production

Make sure that `NODE_ENV` environment variable is set like this:
`NODE_ENV=production` and valid `MONGODB_URL` is configured

### Command to build the client

```
npm run build
```

### Command to run the app

```
npm run start
```

## Notes:

I'm using my own middleware for cross origin resource sharing.
CORS is required only for development because server and client are on different origins.

You can learn more here: https://github.com/ObradovicNikola/cors-cheatsheet
