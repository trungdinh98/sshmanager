const io = require("socket.io")(9000, {
    // path: '/test',
    // serveClient: false,
    // below are engine.IO options
    // pingInterval: 10000,
    // pingTimeout: 5000,
    // cookie: false
  });

const dynamoQuery = require('./dynamoQuery')
const fs = require("fs")
const thisTime = getTime()


if (!fs.existsSync("./logs/")) {
    fs.mkdirSync("./logs/");
}

dynamoQuery.getConnectionInfo(1, (err, results) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(results.resource_key)
    }
})

io.on("connection", function(socket){
    

    socket.on("setupConnection", function(data){
        try{
            let Client = require('ssh2').Client;
            let conn = new Client();
            let resource_id = (JSON.parse(data))['resource_id'];
            dynamoQuery.getConnectionInfo(resource_id, (err, results) => {
                if(err){
                    return socket.emit("return", '\r\n*** Connection information query failed ***\n\r')
                }
                else {
                    let resource_user = results.resource_user;
                    let resource_key = results.resource_key;
                    let resource_dns = results.resource_dns;
                    let project_id = results.project_id;

                    if (!fs.existsSync("./logs/" + padWithZeros(project_id) + "/" )) {
                        fs.mkdirSync("./logs/" + padWithZeros(project_id) + "/");
                    }

                    let logWriter = fs.createWriteStream("./logs/" + padWithZeros(project_id) + "/" + thisTime + padWithZeros(resource_id))

                    conn.on('ready', function(){
                        conn.shell(function(err, stream){
                            if(err){
                                return socket.emit("return", '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
                            }
                            
                            socket.on("data", function(data){
                                stream.write(data);
                                logWriter.write(data)
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
                                logWriter.close();
                            }).on("data", function(data){
                                socket.emit("return", data.toString('binary'));
                                // socket.emit(data);
                            })
                        })
                    }).connect({
                        host: resource_dns,
                        port: 22,
                        username: resource_user,
                        privateKey: resource_key
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