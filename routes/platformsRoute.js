const express = require('express');
const router = express.Router();
const Platform = require("../models/platformsModel");

router.get('/', async function(req, res) {
    try {
        let result = await Platform.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let platformId = req.params.id;
        let result = await Platform.getById(platformId);
        if (!result) {
            res.status(404).send("Platform not found");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async function(req, res) {
    try {
        let newPlatform = req.body;
        let result = await Platform.add(newPlatform);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        let platformId = req.params.id;
        let result = await Platform.delete(platformId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;