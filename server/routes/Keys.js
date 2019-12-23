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
    const today = new Date()
    const keyData = {
        key_name: req.body.key_name,
        project_id: req.body.project_id,
        key_created_at: today,
        key_value: req.body.key_value
    }
    Models.key.findOne ({
        where: {
            key_name: req.body.key_name
        }
    })
    .then (key => {
        if (!key) {
            Models.key.create(keyData)
            .then(function (key) {
                console.log(key.dataValues)
                if (key) {
                    console.log()
                    res.send(key);
                } else {
                    res.status(400).send('Error in insert new record');
                }
            });
        } else {
            res.json({ error: 'Key already exists' })
        }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
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

function putItem(key_id, key_value){
    var params = {
        TableName: process.env.DYNAMO_TABLE,
        Item: {
            "key_id": {
                N: key_id
            },
            "key_value": {
                S: key_value
            }
        }
    }

    dynamoClient.putItem(params, function(err, data){
        if(err){
            console.log("Error", err);
        }
        else{
            console.log("Success", data);
        }
    })
}

module.exports = router;
