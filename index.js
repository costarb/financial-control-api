const winston = require("winston");
const express = require('express');
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require('./swagger/swagger_output.json');
const bodyParser = require('body-parser');
var cors = require('cors');
const port = process.env.PORT || 3000;

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors());

// // Add headers
// app.use(function (req, res, next) {


//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
    
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
//     // Request headers you wish to allow
//     //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     res.setHeader('enablePreflight', true);
    
//     // Pass to next layer of middleware
//     next();
//     });

app.listen(port, () => winston.info(`Listening on port ${port}...`));