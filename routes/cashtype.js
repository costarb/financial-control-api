const {CashType, validate} = require('../models/cashtype'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json()); //to use body object in requests

/**
 * @swagger
 * components:
 *   schemas:
 *     CashType:
 *       type: object
 *       required:
 *         - name
 *         - isActive
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a cashtype
 *         name:
 *           type: string
 *           description: name of cashtype
 *         description:
 *           type: string
 *           descripton: description of cashtype
 *         isActive:
 *           type: bool
 *           descripton: indicate if cashtype is Active or not 
 *       example:
 *         id: 1
 *         name: 1
 *         description: my title
 *         isActive: true
 *
 */

/**
 * @swagger
 * /api/cashtype:
 *   get:
 *     summary: Returns all CashTypes
 *     tags: [CashType]
 *     responses:
 *       200:
 *         description: the list of the cashtype
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CashType'
 */
router.get('/', async (req, res) => {
  const cashtypes = await CashType.find().sort('name');
  res.send(cashtypes);
});

/**
 * @swagger
 * /api/cashtype:
 *   post:
 *     summary: Create a new CashType
 *     tags: [CashType]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CashType'
 *     responses:
 *       200:
 *         description: the list of the cashtype
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/CashType'
 *       500:
 *         description: Some server error
 */
router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const cashtype = await CashType.findByIdAndRemove(req.params.id);

  if (!cashtype) return res.status(404).send('The cashtype with the given ID was not found.');

  res.send(cashtype);
});

router.get('/:id', async (req, res) => {
  const cashtype = await CashType.findById(req.params.id);

  if (!cashtype) return res.status(404).send('The cashtype with the given ID was not found.');

  res.send(cashtype);
});

module.exports = router; 