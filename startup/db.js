const winston = require('winston');
const mongoose = require('mongoose');
const { exceptions } = require('winston');

module.exports = function(){
  mongoose.connect('mongodb+srv://rfbcuser:UnderGround17@cluster0.gopw3.mongodb.net/financial-control-app-db?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology: true } )
    .then(() => winston.info('Connected to MongoDB...'))
    .catch(error => {
      handleError(error);
    });
}