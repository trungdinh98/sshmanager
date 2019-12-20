// const io = require("socket.io")(9000, {
//     // path: '/test',
//     // serveClient: false,
//     // below are engine.IO options
//     // pingInterval: 10000,
//     // pingTimeout: 5000,
//     // cookie: false
//   });

// io.on("connection", function(socket){
    

//     try{
//         let Client = require('ssh2').Client;
//         let conn = new Client();
//         conn.on('ready', function(){
//             conn.shell(function(err, stream){
//                 if(err){
//                     return socket.emit("return", '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
//                 }
                
//                 socket.on("data", function(data){
//                     console.log("1")
//                     stream.write(data);
//                 })
    
//                 socket.on("disconnect", function(){
//                     stream.close();
//                     conn.end();
//                 })
    
//                 socket.on("error", function(){
//                     socket.disconnect();
//                     stream.close();
//                     conn.end();
//                 })
    
//                 stream.on("close", function(){
//                     conn.end()
//                     socket.disconnect();
//                 }).on("data", function(data){
//                     console.log("2")
//                     socket.emit("return", data.toString('binary'));
//                 })
//             })
//         }).connect({
//             host: "54.255.163.170",
//             port: 22,
//             username: "ubuntu",
//             privateKey: require('fs').readFileSync("web-tester.pem")
//         })

        
//     }catch(err){
//         console.log(err);
//     }
// })

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

function delay(i){
    var p = Promise.resolve(i)
    while (i > 0) {
        (i => {
          p = p.then(() => {
            return new Promise(function (resolve, reject) {
              console.log('start', i)
              setTimeout(function () {
                console.log('timeout')
                console.log('end', i)
                resolve()
              }, 1000)
            })
          })
        })(i)
        i--
      }
}

delay(10)