const express = require('express');
const router = express.Router();
const SalesProducts = require("../models/sales-productsModel");

router.get('/', async function(req, res) {
    try {
        let result = await SalesProducts.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let salesProductsId = req.params.id;
        let result = await SalesProducts.getById(salesProductsId);
        if (!result) {
            res.status(404).send("Cart not found");
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
        let newSalesProducts = req.body;
        let result = await SalesProducts.add(newSalesProducts);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        let salesProductsId = req.params.id;
        let result = await SalesProducts.delete(salesProductsId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;