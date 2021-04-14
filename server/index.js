const express = require("express");
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("./db/mongoose");
const clientsRouter = require("./routers/clients");
const providersRouter = require("./routers/providers");

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// Swagger config https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Clients and providers API",
      version: "1.0.0",
      license: {
        name: "MIT",
      },
      description: "Swagger is neat",
      contact: {
        name: "Obradovic Nikola",
        email: "obradovicnikola009@gmail.com",
        url: "https://obradovicnikola.com",
      },
      servers: [`${host}:${port}`],
    },
  },
  apis: ["server/routers/*.js", "server/models/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
// we need cors support for local development
if (process.env.NODE_ENV !== "production") {
  const cors = require("./middleware/cors");

  const corsOptions = {
    allowCredentials: false,
    shortCircuit: true,
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    allowHeaders: ["content-type"],
    maxAge: 120,
    exposeHeaders: ["X-Powered-By"],
  };

  app.use(cors(corsOptions));
}

console.log("Your NODE_ENV is " + process.env.NODE_ENV);

// Routers
app.use("/api", clientsRouter);
app.use("/api", providersRouter);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use("/", express.static(path.join(__dirname, "../dist")));

  // Handle SPA
  // redirect all undefined routes to index.html
  app.get(/.*/, (req, res) =>
    res.sendFile(path.join(__dirname, "../dist/index.html"))
  );
}

app.get("/", (req, res) => {
  let html = '<a href="/api-docs">Docs</a>';
  res.send(html);
});

app.listen(port, () => console.log(`Server running at http://${host}:${port}`));
