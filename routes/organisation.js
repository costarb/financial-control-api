const {Organisation, validate} = require('../models/organisation'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
// var cors = require('../config/cors');
var cors = require('cors');

router
.options("/", cors())
.get('/', cors(), async (req, res) => {
  const organisations = await Organisation.find().sort('name');
  res.send(organisations);
});

router
.options("/", cors())
.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let organisation = new Organisation({ 
    name: req.body.name,
    descripton: req.body.descripton,
    organisationParent: req.body.organisationParent,
    isActive: req.body.isActive
  });
  organisation = await organisation.save();
  
  res.send(organisation);
});

router
.options("/", cors())
.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = await Organisation.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        descripton: req.body.descripton,
        organisationParent: req.body.organisationParent,
        isActive: req.body.isActive
    }, { new: true });

  if (!organisation) return res.status(404).send('The organisation with the given ID was not found.');
  
  res.send(organisation);
});

router
.options("/", cors())
.delete('/:id', async (req, res) => {
  const organisation = await Organisation.findByIdAndRemove(req.params.id);

  if (!organisation) return res.status(404).send('The organisation with the given ID was not found.');

  res.send(organisation);
});

router
.options("/", cors())
.get('/:id', async (req, res) => {
  const organisation = await Organisation.findById(req.params.id);

  if (!organisation) return res.status(404).send('The organisation with the given ID was not found.');

  res.send(organisation);
});

module.exports = router; 