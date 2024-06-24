const express = require('express');
const router = express.Router();
const Contact = require("../models/contactModel");

router.get('/', async function(req, res) {
    try {
        let result = await Contact.getAll();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async function(req, res) {
    try {
        let contactId = req.body;
        let result = await Contact.add(contactId);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;