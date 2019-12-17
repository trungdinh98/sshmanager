const express = require('express');
const router = express.Router();
const Models = require('../models');

router.get('/', (req, res, next) => {
    Models.key.findAll({
        where: {
            project_id: req.param('project_id')
        }
    })
    .then(keys => {
        res.json(keys)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

router.post('/', (req, res, nex) => {
    return Models.key.create({
        project_id: req.body.project_id,
        key_name: req.body.key_name
    }).then(function (key) {
        if (key) {
            response.send(key);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});

router.delete('/', (req, res, next) => {
    Models.key.destroy({
        where: {
            key_id: req.param('key_id')
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
