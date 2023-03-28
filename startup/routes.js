const express = require('express');
const cashmovement = require(__dirname + '/routes/cashmovement');
const cashtype = require(__dirname + 'routes/cashtype');
const customers = require(__dirname + 'routes/customers');
const entrytype = require(__dirname + 'routes/entrytype');
const organisation = require(__dirname + 'routes/organisation');
const users = require(__dirname + 'routes/users');
const auth = require(__dirname + 'routes/auth');
const error = require(__dirname + 'middleware/error');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/cashmovement', cashmovement);
    app.use('/api/cashtype', cashtype);
    app.use('/api/customers', customers);
    app.use('/api/entrytype', entrytype);
    app.use('/api/organisation', organisation);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}