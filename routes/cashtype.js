const {CashType, validate} = require('../models/cashtype'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var cors = require('cors');

router
.options("/", cors())
.get('/', cors(),async (req, res) => {
  const cashtypes = await CashType.find().sort('name');
  res.send(cashtypes);
});

router
.options("/", cors())
.post('/', cors(),async (req, res) => {
    try{
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let cashtype = new CashType({ 
    name: req.body.name,
    descripton: req.body.descripton,
    isActive: req.body.isActive
  });
  cashtype = await cashtype.save();
  
  res.send(cashtype);
}catch (error) {
    return res.status(500).send(error);
}
});

router
.options("/", cors())
.put('/:id', cors(),async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const cashtype = await CashType.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        descripton: req.body.descripton,
        isActive: req.body.isActive
    }, { new: true });

  if (!cashtype) return res.status(404).send('The cashtype with the given ID was not found.');
  
  res.send(cashtype);
});

router
.options("/", cors())
.delete('/:id', cors(),async (req, res) => {
  const cashtype = await CashType.findByIdAndRemove(req.params.id);

  if (!cashtype) return res.status(404).send('The cashtype with the given ID was not found.');

  res.send(cashtype);
});

router
.options("/", cors())
.get('/:id', cors(), async (req, res) => {
  const cashtype = await CashType.findById(req.params.id);

  if (!cashtype) return res.status(404).send('The cashtype with the given ID was not found.');

  res.send(cashtype);
});

module.exports = router; 