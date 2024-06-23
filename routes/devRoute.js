const express = require('express');
const router = express.Router();
const Developer = require("../models/devModel");

router.get('/', async function(req, res) {
    try {
        let result = await Developer.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async function(req, res) {
    try {
        let developerId = req.body;
        let result = await Developer.add(developerId);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let DeveloperId = req.params.id;
        let result = await Developer.getById(DeveloperId);
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
        let DeveloperId = req.params.id;
        let result = await Developer.delete(DeveloperId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;