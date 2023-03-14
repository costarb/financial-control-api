const { bool, boolean } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const entryTypeSchema = new mongoose.Schema({
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
});

const EntryType = mongoose.model('EntryType', entryTypeSchema);

function validateEntryType(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    descripton: Joi.string(),
    isActive: Joi.bool()
  });

  return schema.validate(genre);
}

exports.entryTypeSchema = entryTypeSchema;
exports.EntryType = EntryType; 
exports.validate = validateEntryType;