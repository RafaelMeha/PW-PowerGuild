const express = require('express');
const router = express.Router();
const Reviews = require("../models/reviewsModel");
 
router.get('/', async function(req, res) {
    try {
        let result = await Reviews.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async function(req, res) {
    try {
        let newReview = req.body;
        let result = await Reviews.add(newReview);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let reviewId = req.params.id;
        let result = await Product.getById(reviewId);
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