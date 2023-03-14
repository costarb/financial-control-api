const { bool, boolean } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const cashTypeSchema = new mongoose.Schema({
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
});

const CashType = mongoose.model('CashType', cashTypeSchema);

function validateCashType(cashtype) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    descripton: Joi.string(),
    isActive: Joi.bool()
  });

  return schema.validate(cashtype);
}

exports.cashTypeSchema = cashTypeSchema;
exports.CashType = CashType; 
exports.validate = validateCashType;