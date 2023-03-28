const express = require('express');
const cashmovement = require('../routes/cashmovement');
const cashtype = require('../routes/cashtype');
const customers = require('../routes/customers');
//const entrytype = require('../routes/entrytype');
const organisation = require('../routes/organisation');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/cashmovement', cashmovement);
    app.use('/api/cashtype', cashtype);
    app.use('/api/customers', customers);
    //app.use('/api/entrytype', entrytype);
    app.use('/api/organisation', organisation);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}