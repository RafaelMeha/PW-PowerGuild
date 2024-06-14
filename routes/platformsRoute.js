const express = require('express');
const router = express.Router()
const platforms = require("../models/platformsModel")

router.get('/', async function(req, res){
    try {
        let result = await platforms.getAll()
        res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router;