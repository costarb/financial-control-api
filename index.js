const winston = require("winston");
const express = require('express');
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 8092;

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Financial Control API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: `http://localhost:${port}`,
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.listen(port, () => winston.info(`Listening on port ${port}...`));