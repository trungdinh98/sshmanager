const io = require("socket.io")(9000, {});

const dynamoQuery = require('./dynamoQuery')
const fs = require("fs")
const thisTime = getTime()
const dir = "./ssh-node/logs/"

// require('dotenv').config();
// const AWS = require("aws-sdk");
// AWS.config.update({
//     region: process.env.AWS_REGION
// })

// const s3_client = new AWS.S3();

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// dynamoQuery.getConnectionInfo(1, (err, results) => {
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(results.resource_key)
//     }
// })

io.on("connection", function(socket){
    

    socket.on("setupConnection", function(data){
        try{
            console.log(data)
            let Client = require('ssh2').Client;
            let conn = new Client();
            let resource_id = data
            dynamoQuery.getConnectionInfo(resource_id, (err, results) => {
                if(err){
                    return socket.emit("return", '\r\n*** Connection information query failed ***\n\r')
                }
                else {
                    let resource_user = results.resource_user;
                    let resource_key = results.resource_key;
                    let resource_dns = results.resource_dns;
                    let project_id = results.project_id;
                    console.log("line 47: " + project_id)
                    console.log("line 48: " + resource_key)

                    if (!fs.existsSync(dir + padWithZeros(project_id) + "/" )) {
                        fs.mkdirSync(dir + padWithZeros(project_id) + "/");
                    }

                    let userCmdWriter = fs.createWriteStream(dir + padWithZeros(project_id) + "/" + new Date().getTime() + "-" + padWithZeros(resource_id) + ".txt")
                    userCmdWriter.write("[" + JSON.stringify({time: new Date().getTime(), value: "start session"}));
                    // let serverResponseWriter = 

                    conn.on('ready', function(){
                        conn.shell(function(err, stream){
                            if(err){
                                return socket.emit("return", '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
                            }
                            
                            socket.on("data", function(data){
                                stream.write(data);
                                // userCmdWriter.write(data)
                            })
                
                            socket.on("disconnect", function(){
                                stream.close();
                                conn.end();
                            })
                
                            socket.on("error", function(){
                                socket.disconnect();
                                stream.close();
                                conn.end();
                            })
                
                            stream.on("close", function(){
                                conn.end()
                                socket.disconnect();
                                userCmdWriter.write("]")
                                userCmdWriter.close();
                            }).on("data", function(data){
                                socket.emit("return", data.toString('binary'));
                                userCmdWriter.write("," + JSON.stringify({time: new Date().getTime(), value: data.toString('binary')}))
                                // socket.emit(data);
                            })
                        })
                    }).connect({
                        // host: resource_dns,
                        // port: 22,
                        // username: resource_user,
                        // privateKey: resource_key
                        host: "54.255.163.170",
                        port: 22,
                        username: "ubuntu",
                        privateKey: require('fs').readFileSync("web-tester.pem")
                    })
                }
            })
    
            
        }catch(err){
            console.log(err);
        }
    })
})

function getTime(){
    var today = new Date();
    var date = today.getFullYear() + ':' + (today.getMonth() + 1) + ':' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + '-' + time;
}

function padWithZeros(number){
    var my_string = '' + number;
    while(my_string.length < 11){
        my_string = '0' + my_string;
    }
    return my_string;
}