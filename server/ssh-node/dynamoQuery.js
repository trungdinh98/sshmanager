require('dotenv').config();
fs = require('fs')

const AWS = require("aws-sdk");
AWS.config.update({
    region: process.env.AWS_REGION
})

const dynamoClient = new AWS.DynamoDB();
const mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;
const DB_NAME = process.env.DB_NAME;

console.log("Connected to dynamoDb");
console.log(process.env.DYNAMO_TABLE)

// connectionInfo(1);
getItem('1001')
putItem('1002', '1002value')

function connectionInfo(resource_id){


    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWD,
        database: DB_NAME
    });

    connection.connect(err => {
        if(err) {
            return err;
        }
        else console.log("Connected to mysql")
    });

    sql_command = "SELECT * FROM resources WHERE resource_id = ?";

    connection.query(sql_command, [resource_id], (err, results) => {
        if(err){
            console.log(err)
            return err;
        }
        else {
            console.log(results[0].resource_name);
            let user = results[0].resource_user
            let dns = results[0].resource_dns
            let key_id = results[0].key_id

            console.log(user + "\n" + dns + "\n" + key_id)

            // let key_value = getItem(1001, (err, results) => {
            //     if(err){
            //         console.log(err)
            //     }
            //     else{
            //         console.log(results) 
            //     }
            // })
        }
    })

    connection.end();

}

function getItem(key_id){
    let params = {
        TableName: process.env.DYNAMO_TABLE,
        Key: {
            "key_id": {
                N: key_id
            } 
        }
    }

    dynamoClient.getItem(params, function(err, data){
        if(err){
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            return JSON.stringify(err, null, 2)
        }
        else{
            console.log("Query succeeded.");
            console.log(AWS.DynamoDB.Converter.unmarshall(data.Item))
            return AWS.DynamoDB.Converter.unmarshall(data.Item).key_value
        }
    })

}

function putItem(key_id, key_value){
    // fs.readFile('web-tester.pem', (err, data) => {
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log(data.toString('binary'))
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
    
        // }
    // })
}


