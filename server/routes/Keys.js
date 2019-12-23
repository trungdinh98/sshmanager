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
            key_name: req.body.key_name,
            project_id: req.body.project_id
        }
    })
    .then (key => {
        if (!key) {
            Models.key.create(keyData)
            .then(function (key) {
                
                if (key) {
                    putItem(key.dataValues.key_id.toString(), keyData.key_value);
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
        deleteItem(req.param('key_id').toString())
        res.json(keys)
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})



function putItem(key_id, key_value){
    let AWS = require("aws-sdk");
    AWS.config.update({
        region: process.env.AWS_REGION
    })

    let dynamoClient = new AWS.DynamoDB();

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

function deleteItem(key_id){
    let AWS = require("aws-sdk");
    AWS.config.update({
        region: process.env.AWS_REGION
    })

    let dynamoClient = new AWS.DynamoDB();

    var params = {
        TableName: process.env.DYNAMO_TABLE,
        Key: {
            "key_id": {
                N: key_id
            }
        }
    }

    dynamoClient.deleteItem(params, function(err, data){
        if(err){
            console.log("Error", err);
        }
        else{
            console.log("Success", data);
        }
    })
}

module.exports = router;
