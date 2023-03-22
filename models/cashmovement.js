
const { bool, boolean } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const cashMovementSchema = new mongoose.Schema({
    movementDate: {
        type: Date,
        required: true
    },
    referenceMonth: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    cashType: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
              },
              descripton: {
                type: String,
                minlength: 5,
                maxlength: 100
              },
              isActive: {
                type: Boolean,
                default: true
              }
        })
    },
    entryType: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
              },
              descripton: {
                type: String,
                require: true,
                minlength: 5,
                maxlength: 100
              },
              isActive: {
                type: Boolean,
                default: true
              }
        })
    },
    organisation: { 
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
              },
              descripton: {
                type: String,
                require: true,
                minlength: 5,
                maxlength: 100
              },
              isActive: {
                type: Boolean,
                default: true
              }
        }) 
    },
    userId: { 
        type: String
    },
    creationDate: { 
        type: Date 
    },
    updateDate: { 
        type: Date 
    }
});

const CashMovement = mongoose.model('CashMovement', cashMovementSchema);

function validateCashMovement(cashmovement) {
    const schema = Joi.object({
        movementDate: Joi.date().required(),
        referenceMonth: Joi.string(),
        value: Joi.number(),
        cashType: Joi.any(),
        entryType: Joi.any(),
        organisation: Joi.any(),
        userId: Joi.string(),
        creationDate: Joi.date(),
        updateDate: Joi.date()
    });

    return schema.validate(cashmovement);
}

exports.cashMovementSchema = cashMovementSchema;
exports.CashMovement = CashMovement;
exports.validate = validateCashMovement;