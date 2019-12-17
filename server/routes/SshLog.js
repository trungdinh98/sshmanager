const express = require('express');
const router = express.Router();
const Models = require('../models');

router.get('/', (req, res, next) => {
    Models.sshLog.findAll({
        where: {
            project_id: req.param('project_id')
        }
    })
    .then(logs => {
        console.log(logs)
        res.json(logs)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

module.exports = router;
