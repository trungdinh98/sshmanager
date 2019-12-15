const express = require('express');
const router = express.Router();
const Key = require('../models/key.js');

router.get('/', (req, res, next) => {
    Key.findAll()
        .then(keys => {
            res.json(keys)
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
})

router.get('/:id', (req, res, next) => {
    Key.findAll({
        where: {
            project_id: req.params.id
        }
    })
    .then(keys => {
        res.json(keys)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

module.exports = router;
