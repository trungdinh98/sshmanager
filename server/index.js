const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

const SELECT_ALL_PROJECT_QUERY = 'SELECT * FROM Project'

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;
const DB_NAME = process.env.DB_NAME;

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
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello server!')
});

app.get('/project/add', (req, res) => {
    const { idProject, name } = req.query
    const INSERT_PROJECTS_QUERY = `INSERT INTO Project (idProject, name) VALUES ('${idProject}', '${name}')`
    connection.query(INSERT_PROJECTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send('Successfully added project!')
        }
    });
});

app.get('/project', (req, res) => {
    connection.query(SELECT_ALL_PROJECT_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
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
    console.log(`Server is listening on port 4000!`)
});