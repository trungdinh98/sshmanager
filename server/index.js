const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PROJECT_QUERY = 'SELECT * FROM Project'

const connection = mysql.createConnection({
    host: '172.10.10.10',
    user: 'root',
    password: 'mmypasswd',
    database: 'mydb'
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

app.listen(4000, () => {
    console.log(`Server is listening on port 4000!`)
});
