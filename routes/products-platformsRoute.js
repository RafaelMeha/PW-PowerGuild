const express = require('express');
const router = express.Router();
const ProductsPlatforms = require("../models/products-platformsModel");

router.get('/', async function(req, res) {
    try {
        let result = await ProductsPlatforms.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let productsPlatformsId = req.params.id;
        let result = await ProductsPlatforms.getById(productsPlatformsId);
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
        let newProductPlatform = req.body;
        let result = await ProductsPlatforms.add(newProductPlatform);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        let productsPlatformsId = req.params.id;
        let result = await ProductsPlatforms.delete(productsPlatformsId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;