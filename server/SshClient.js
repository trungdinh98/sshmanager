const io = require("socket.io")(9000, {
    // path: '/test',
    // serveClient: false,
    // below are engine.IO options
    // pingInterval: 10000,
    // pingTimeout: 5000,
    // cookie: false
  });


io.on("connection", function(socket){

    var Client = require('ssh2').Client;
    var conn = new Client();
    conn.on('ready', function(){
        socket.on("data", function(data){
            socket.emit("return", data);
        })
    })

    socket.on("data", function(data){
        socket.emit("return", "server return code: xxx");
    })
})

// var Client = require('ssh2').Client;
// var readline = require('readline')

// var conn = new Client();
// conn.on('ready', function() {
// //   console.log('Client :: ready');
//   conn.shell(function(err, stream) {
//     if (err) throw err;

//     var rl = readline.createInterface(process.stdin, process.stdout)

//     stream.on('close', function() {
//       process.stdout.write('Connection closed')
//       console.log('Stream :: close');
//       conn.end();
      
//     }).on('data', function(data) {
//       process.stdin.pause();
//       process.stdout.write(data);
//       process.stdin.resume();
//     }).stderr.on('data', function(data){
//       process.stderr.write(data);
//     })
//     // ;
//     // stream.end('exit\n');

//     rl.on('line', function(d){
//       // send data to through the client to the host
//       process.stdin.setRawMode(true);
//       stream.write(d.trim() + '\n');
//     })

//     rl.on('SIGINT', function () {
//       // stop input
//       process.stdin.pause()
//       process.stdout.write('\nEnding session\n')
//       rl.close()

//       // close connection
//       stream.end('exit\n')
//     })
//   });
// }).connect({
//   host: '18.136.194.128',
//   port: 22,
//   username: 'ubuntu',
//   privateKey: require('fs').readFileSync('web-tester.pem')
// });