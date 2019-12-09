const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
    host: '172.10.10.10',
    user: 'root',
    password: 'mypasswd',
    database: 'mydb'
});

connection.connect(err => {
    if(err) {
        return err;
    } else {
        console.log('Connected to the MySQL server');
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello server!')
});

app.get('/project/add', (req, res) => {
    const { project_id, project_name } = req.query
    const INSERT_PROJECTS_QUERY = `INSERT INTO projects (project_id, project_name) VALUES ('${project_id}', '${project_name}')`
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
    const SELECT_ALL_PROJECT_QUERY = 'SELECT * FROM projects';
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

app.get('/key', (req, res) => {
    const SELECT_ALL_KEY_QUERY = 'SELECT * FROM `keys`';
    connection.query(SELECT_ALL_KEY_QUERY, (err, results) => {
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
    console.log(`Server is listening at http://localhost:4000!`)
});
