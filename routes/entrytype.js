const {EntryType, validate} = require('../models/entrytype'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var cors = require('cors');

router
.options("/", cors())
.get('/', cors(),async (req, res) => {
  const entrytypes = await EntryType.find().sort('name');
  res.send(entrytypes);
});

router
.options("/", cors())
.post('/', cors(),async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let entrytype = new EntryType({ 
    name: req.body.name,
    descripton: req.body.descripton,
    isActive: req.body.isActive
  });
  entrytype = await entrytype.save();
  
  res.send(entrytype);
});

router
.options("/", cors())
.put('/:id', cors(),async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const entrytype = await EntryType.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        descripton: req.body.descripton,
        isActive: req.body.isActive
    }, { new: true });

  if (!entrytype) return res.status(404).send('The entrytype with the given ID was not found.');
  
  res.send(entrytype);
});

router
.options("/", cors())
.delete('/:id', cors(),async (req, res) => {
  const entrytype = await EntryType.findByIdAndRemove(req.params.id);

  if (!entrytype) return res.status(404).send('The entrytype with the given ID was not found.');

  res.send(entrytype);
});

router
.options("/", cors())
.get('/:id', cors(),async (req, res) => {
  const entrytype = await EntryType.findById(req.params.id);

  if (!entrytype) return res.status(404).send('The entrytype with the given ID was not found.');

  res.send(entrytype);
});

module.exports = router; 