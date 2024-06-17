const express = require('express');
const router = express.Router();
const ProductWishlist = require("../models/products-wishlistsModel");

router.get('/', async function(req, res) {
    try {
        let result = await ProductWishlist.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let productWishlistId = req.params.id;
        let result = await ProductWishlist.getById(productWishlistId);
        if (!result) {
            res.status(404).send("ProductWishlistId not found");
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
        let newProductWishlist = req.body;
        let result = await ProductWishlist.add(newProductWishlist);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        let ProductWishlistId = req.params.id;
        let result = await ProductWishlist.delete(ProductWishlistId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;