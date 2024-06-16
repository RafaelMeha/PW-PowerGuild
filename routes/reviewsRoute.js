const express = require('express');
const router = express.Router();
const Review = require("../models/reviewsModel");

router.get('/', async function(req, res) {
    try {
        let result = await Review.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async function(req, res) {
    try {
        let newReview = req.body;
        let result = await Review.add(newReview);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let reviewId = req.params.id;
        let result = await Review.getReviewById(reviewId);
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

router.get('/product/:id', async function(req, res) {
    try {
        let productId = req.params.id;
        let result = await Review.getByProductId(productId);
        if (!result || result.length === 0) {
            res.status(404).send("No reviews found for the product");
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
        let reviewId = req.params.id;
        let result = await Review.delete(reviewId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;