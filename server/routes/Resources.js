const express = require('express');
const router = express.Router();
const Models = require('../models');

router.get('/', (req, res, next) => {
    Models.resource.findAll({
        where: {
            project_id: req.param('project_id')
        }
    })
    .then(resources => {
        res.json(resources)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

router.post('/', (req, res, nex) => {
    return Models.resource.create({
        project_id: req.body.project_id,
        resource_name: req.body.resource_name,
        resource_dns: req.body.resource_dns,
        key_id: req.body.key_id,
        resource_user: req.body.resource_user
    }).then(function (resource) {
        if (resource) {
            response.send(resource);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});

router.delete('/', (req, res, next) => {
    Models.resource.destroy({
        where: {
            resource_id: req.param('resource_id')
        }
    })
    .then(resources => {
        res.json(resources)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

module.exports = router;
