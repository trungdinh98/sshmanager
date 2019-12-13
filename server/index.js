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
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWD,
    database: DB_NAME
});

connection.connect(err => {
    if(err) {
        return err;
    }
    else console.log("Connected to mysql")
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello server!')
});

app.get('/projects', (req, res) => {
    let { user_id } = req.query;
    
    let sql_command = "SELECT * FROM projects \
    INNER JOIN project_users \
    ON projects.project_id=project_users.project_id \
    WHERE user_id = ?";

    connection.query(sql_command, [user_id], (err, results) => {
        // console.log(results);
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

app.post('/projects', (req, res) => {

    let {project_name, user_id} = req.body;
    // console.log(req.body);

    let sql_command = "INSERT INTO projects (project_name) VALUES (?)"
    connection.query(sql_command, [project_name], (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            let project_id = results.insertId;
            let sql_command = "INSERT INTO project_users (project_id, user_id, is_admin) VALUES (?, ?, ?)";
            connection.query(sql_command, [project_id, user_id, 1], (err, results) => {
                if(err){
                    console.log(err)
                    return res.send(err);
                }
                else{
                    console.log(results)
                    return res.send("projects has been updated");
                }
            })
        }
    });
});

app.delete('/projects', (req, res) => {
    let {project_id} = req.query;

    console.log(req.query);

    let sql_command = "DELETE FROM projects WHERE project_id = ?"

    connection.query(sql_command, [
        project_id
    ], (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            console.log(results);
            return res.send("project has been deleted")
        }
    })
})






app.get('/resources', (req, res) => {
    let sql_command = "SELECT * FROM resources WHERE project_id = ?";
    let { project_id } = req.query
    // console.log(req.query);
    connection.query(sql_command, [project_id], (err, results) => {
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

app.post('/resources', (req, res) => {
    let {project_id, resource_name, resource_dns, key_id, resource_user} = req.body;

    console.log(req.body);

    let sql_command = "INSERT INTO resources \
        (project_id, \
        resource_name, \
        resource_dns, \
        key_id, \
        resource_user) VALUES (?, ?, ?, ?, ?)";

    console.log(project_id, resource_name, resource_dns, key_id, resource_user);

    connection.query(sql_command, [
        project_id,
        resource_name,
        resource_dns,
        key_id,
        resource_user
    ], (err, results) => {
        if(err){
            return res.send(err)
        }
        else {
            console.log(results);
            return res.send("resource has been updated")
        }
    })
})

app.delete('/resources', (req, res) => {
    let {resource_id} = req.query;

    console.log(req.query);

    let sql_command = "DELETE FROM resources WHERE resource_id = ?"

    connection.query(sql_command, [
        resource_id
    ], (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            console.log(results);
            return res.send("resource has been deleted")
        }
    })
})

app.listen(4000, () => {
    console.log(`Server is listening at http://localhost:4000!`)
});
