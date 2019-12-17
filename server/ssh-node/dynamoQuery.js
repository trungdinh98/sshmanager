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

// connectionInfo(1);
// getItem('1001')
// putItem('1002', '1002value')

// getConnectionInfo(3, (err, results) => {
//     if (err){
//         console.log(err);
        
//     }
//     else {
//         console.log(results);
        
//     }
// })

async function getConnectionInfo(resource_id, callback){


    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWD,
        database: DB_NAME
    });

    connection.connect(err => {
        if(err) {
            callback(err, null);
        }
        else console.log("Connected to mysql")
    });

    sql_command = "SELECT * FROM resources WHERE resource_id = ?";

    connection.query(sql_command, [resource_id], (err, results) => {
        if(err){
            // console.log(err)
            callback(err, null);
        }
        else {
            // console.log(results[0])
            let user = results[0].resource_user
            let dns = results[0].resource_dns
            let key_id = results[0].key_id
            let project_id = results[0].project_id

            // console.log("line65: " + project_id)
            // callback(null, results)

            // console.log(key_id.toString())

            getItem(key_id.toString(), (err, key_value) => {
                if(err){
                    // console.log(err)
                    callback(err, null)
                }
                else{
                    // console.log(key_value) 
                    callback(null, {
                        resource_user: user,
                        resource_dns: dns,
                        resource_key: key_value,
                        project_id: project_id
                    })
                    // return results
                }
            })

            
        }
    })

    connection.end();

}

function getItem(key_id, callback){
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
            // console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            callback(JSON.stringify(err, null, 2), null)
        }
        else{
            // console.log("Query succeeded.");
            // console.log(AWS.DynamoDB.Converter.unmarshall(data.Item))
            callback(null, AWS.DynamoDB.Converter.unmarshall(data.Item).key_value)
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

module.exports = {getConnectionInfo}
