const winston = require("winston");
const express = require('express');
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require('./swagger/swagger_output.json');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => winston.info(`Listening on port ${port}...`));