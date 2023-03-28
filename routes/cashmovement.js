const { CashMovement, validate } = require('@models/cashmovement');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var cors = require('cors');

router
    .options("/", cors())
    .get('/', cors(), async (req, res) => {
        const cashmovements = await CashMovement.find().sort('movementDate');
        res.send(cashmovements);
    });

router
    .options("/:startdate/:enddate", cors())
    .get('/:startdate/:enddate', cors(), async (req, res) => {
        var query = {movementDate: { $gt: req.params.startdate, $lt: req.params.enddate}}
        const cashmovements = await CashMovement.find(query).sort('movementDate');
        res.send(cashmovements);
    });

    router
    .options("/:referenceMonth", cors())
    .get('/:referenceMonth', cors(), async (req, res) => {
        var query = {referenceMonth: req.params.referenceMonth}
        const cashmovements = await CashMovement.find(query).sort('referenceMonth');
        res.send(cashmovements);
    });

router
    .options("/", cors())
    .post('/', cors(), async (req, res) => {
        try {
            const { error } = validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            let cashmovement = new CashMovement({
                name: req.body.name,
                movementDate: req.body.movementDate,
                referenceMonth: req.body.referenceMonth,
                value: req.body.value,
                cashType: req.body.cashType,
                entryType: req.body.entryType,
                organisation: req.body.organisation,
                userId: req.body.userId,
                creationDate: req.body.creationDate,
            });
            cashmovement = await cashmovement.save();

            res.send(cashmovement);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    });

router
    .options("/", cors())
    .put('/:id', cors(), async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const cashmovement = await CashMovement.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                movementDate: req.body.movementDate,
                referenceMonth: req.body.referenceMonth,
                value: req.body.value,
                cashType: req.body.cashType,
                entryType: req.body.entryType,
                organisation: req.body.organisation,
                userId: req.body.userId,
                updateDate: req.body.updateDate
            }, { new: true });

        if (!cashmovement) return res.status(404).send('The cashmovement with the given ID was not found.');

        res.send(cashmovement);
    });

router
    .options("/", cors())
    .delete('/:id', cors(), async (req, res) => {
        const cashmovement = await CashMovement.findByIdAndRemove(req.params.id);

        if (!cashmovement) return res.status(404).send('The cashmovement with the given ID was not found.');

        res.send(cashmovement);
    });

router
    .options("/", cors())
    .get('/:id', cors(), async (req, res) => {
        const cashmovement = await CashMovement.findById(req.params.id);

        if (!cashmovement) return res.status(404).send('The cashmovement with the given ID was not found.');

        res.send(cashmovement);
    });

module.exports = router; 