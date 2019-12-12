const io = require("socket.io")(9000, {
    // path: '/test',
    // serveClient: false,
    // below are engine.IO options
    // pingInterval: 10000,
    // pingTimeout: 5000,
    // cookie: false
  });


io.on("connection", function(socket){
    try{
        var Client = require('ssh2').Client;
        var conn = new Client();
        conn.on('ready', function(){
            conn.shell(function(err, stream){
                if(err){
                    return socket.emit("return", '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
                }
                
                socket.on("data", function(data){
                    stream.write(data);
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
                }).on("data", function(data){
                    socket.emit("return", data.toString('binary'));
                    // socket.emit(data);
                })
            })
        }).connect({
            host: '54.254.140.154',
            port: 22,
            username: 'ubuntu',
            privateKey: require('fs').readFileSync('./web-tester.pem')
        })
    }catch(err){
        console.log(err);
    }
})
