const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var Users = require('./routes/Users');
app.use('/users', Users);

var Keys = require('./routes/Keys');
app.use('/keys', Keys);

app.get('/', (req, res) => {
    res.send('Hello server!')
});

app.get('/resources', (req, res) => {
    let sql_command = "SELECT * FROM resources WHERE project_id = ?";
    connection.query(sql_command, [projectId], (err, results) => {
        if(err){
            return res.send(err)
        } 
        else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/resources/add', (req, res) => {})

app.get('/resources/remove', (req, res) => {})

app.listen(4000, () => {
    console.log(`Server is listening at http://localhost:4000!`)
});
