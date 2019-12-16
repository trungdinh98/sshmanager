const fs = require("fs");
const dir = "./ssh-node/logs/"


// listLogs(1001, (err, logs) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(logs)
//     }
// })

logReplay(1001,"1576434455901-00000000001.txt", (err, results) => {
    if(err){
        console.log(err);
    }
    else{
        // console.log(JSON.parse(results))
        let data = JSON.parse(results)
        console.log(data)
        // data.forEach(line => {
        //     console.log(line.value)
        // });
    }
})

function listLogs(project_id, callback){
    fs.readdir(dir + padWithZeros(project_id), (err, log) => {
        if(err){
            callback(err, null)
        }
        else{
            callback(null, log)
        }
    })
}

function logReplay(project_id, log, callback){
    console.log(dir + padWithZeros(project_id) + "/" + log)
    fileDir = dir + padWithZeros(project_id) + "/" + log
    fs.readFile(fileDir, (err, results) => {
        if(err){
            callback(err, null)
        }
        else{
            // console.log(results.toString())
            callback(null, results.toString())
        }
    })
}

function padWithZeros(number){
    var my_string = '' + number;
    while(my_string.length < 11){
        my_string = '0' + my_string;
    }
    return my_string;
}