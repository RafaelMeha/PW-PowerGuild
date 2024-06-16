const express = require('express');
const router = express.Router();
const User = require("../models/usersModel");

router.get('/', async function(req, res) {
    try {
        let result = await User.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async function(req, res) {
    try {
        let newUser = req.body;
        let result = await User.add(newUser);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let userId = req.params.id;
        let result = await User.getById(userId);
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
        let userId = req.params.id;
        let result = await Review.delete(userId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;