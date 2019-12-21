const io = require("socket.io")(9000, {});

const dbQuery = require('./dbQuery')
const fs = require("fs")
const thisTime = getTime()
const dir = "./logs/"
const sshLog = "./SshLog"

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

io.on("connection", function(socket){
    

    socket.on("setupConnection", function(data){
        try{
            console.log(data)
            let Client = require('ssh2').Client;
            let conn = new Client();
            let resource_id = data
            dbQuery.getConnectionInfo(resource_id, (err, results) => {
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

                    
                    let log_name = new Date().getTime() + "-" + padWithZeros(resource_id)
                    console.log(log_name)

                    dbQuery.addLog(project_id, log_name, (err, result) => {
                        if(err){
                            console.log(err)
                            socket.emit("return", "db connection error")
                        }
                        
                        let userCmdWriter = fs.createWriteStream(dir + padWithZeros(project_id) + "/" + log_name + ".txt")

                        conn.on('ready', function(){
                            userCmdWriter.write("[" + JSON.stringify({time: new Date().getTime(), value: "start session"}));

                            conn.shell(function(err, stream){
                                if(err){
                                    return socket.emit("return", '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
                                }

                                // let value = "";
                                // let timeStamp = new Date().getTime()
                                
                                socket.on("data", function(data){
                                    stream.write(data);

                                    // value = value + data
                                    // console.log(value)
                                    // userCmdWriter.write(data);
                                    
                                    // if(data == "\n" || data=="\r" || data == "\r\n"){
                                    //     userCmdWriter.write(JSON.stringify({time: timeStamp, value: value}) + ",");
                                    //     timeStamp = new Date().getTime()
                                    //     value = ""
                                    // }
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
                                    userCmdWriter.write("," + JSON.stringify({time: new Date().getTime(), value: "end session".toString('binary')}) + "]")
                                    userCmdWriter.close();
                                }).on("data", function(data){
                                    socket.emit("return", data.toString('binary'));
                                    userCmdWriter.write("," + JSON.stringify({time: new Date().getTime(), value: data.toString('binary')}))
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
                    })
                    

                    
                }
            })
    
            
        }catch(err){
            console.log(err);
        }
    })

    socket.on("getSshLog", function(project_id, log_name){
        try{
            console.log(project_id)
            console.log(log_name)

            let fileDir = dir + padWithZeros(project_id) + "/" + log_name + ".txt"
            
            fileReader = fs.readFile(fileDir, (err, data) => {
                if(err){
                    socket.emit("returnLog", err.toString);
                }
                else{
                    // values = JSON.parse(data)
                    // values.forEach(element => {
                    //     socket.emit("returnLog", element.value)
                    // });
                    socket.emit("returnLog", data.toString())
                    // console.log(data)
                }
            })
        } catch(err) {
            console.log(err)
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

function setSpeed(miliseconds){
    return miliseconds
}
