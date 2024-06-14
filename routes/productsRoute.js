const express = require('express');
const router = express.Router();
const Platform = require("../models/productsModel");

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
        let productId = req.params.id;
        let result = await Platform.getById(productId);
        if (!result) {
            res.status(404).send("Product not found");
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
        let newProduct = req.body;
        let result = await Platform.add(newProduct);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        let productId = req.params.id;
        let result = await Platform.delete(productId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;