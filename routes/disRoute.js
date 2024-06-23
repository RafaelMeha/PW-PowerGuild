const express = require('express');
const router = express.Router();
const Distributor = require("../models/disModel");

router.get('/', async function(req, res) {
    try {
        let result = await Distributor.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async function(req, res) {
    try {
        let newDistributor = req.body;
        let result = await Distributor.add(newDistributor);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let DistributorId = req.params.id;
        let result = await Distributor.getById(DistributorId);
        if (!result) {
            res.status(404).send("Review not found");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async function(req, res) { 
    try {
        let DistributorId = req.params.id;
        let result = await Distributor.delete(DistributorId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;