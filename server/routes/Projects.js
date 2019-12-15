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

// router.post('/', (req, res, nex) => {
//     return Models.project.create({
//         project_name: req.body.project_name
//     })
//     .then(function (createProjectUser) {
//         Models.project_user.create({
//             user_id: req.body.user_id,
//         })
//     })
//     .then(function (project) {
//         if (project) {
//             response.send(project);
//         } else {
//             response.status(400).send('Error in insert new record');
//         }
//     });
// });

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
