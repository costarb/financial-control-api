const { bool, boolean } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
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
  organisationParent : {
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
    }
    })
   },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Organisation = mongoose.model('Organisation', organisationSchema);

function validateOrganisation(organisation) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    descripton: Joi.string(),
    isActive: Joi.bool()
  });

  return schema.validate(organisation);
}

exports.organisationSchema = organisationSchema;
exports.Organisation = Organisation; 
exports.validate = validateOrganisation;