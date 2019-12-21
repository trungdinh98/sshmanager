const express = require('express');
const router = express.Router();
const Models = require('../models');

router.get('/', (req, res, next) => {
    Models.project.findAll({
        include: [{
            model: Models.user,
            where: { 
                user_id: req.param('user_id')
            },
        }],
    })
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

router.post('/', (req, res, nex) => {
    return Models.project.create({
        project_name: req.body.project_name
    })
    .then(function (results) {
        Models.sequelize.query(
            `INSERT INTO projectUsers (project_id, user_id, is_admin) \
            VALUES (${results.dataValues.project_id}, ${req.body.user_id}, ${1})`
        )
        .then(function(err, results){
            if (err) {
                res.send(err);
            } else {
                res.send(results);
            }
        })

        // "projectUser".create({
        //     project_id: results.dataValues.project_id,
        //     user_id: req.body.user_id,
        // })
    })
    // .then(function (project) {
    //     if (project) {
    //         res.send(project);
    //     } else {
    //         res.status(400).send('Error in insert new record');
    //     }
    // });
});

router.delete('/', (req, res, next) => {
    Models.project.destroy({
        where: {
            project_id: req.param('project_id')
        }
    })
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

module.exports = router;
