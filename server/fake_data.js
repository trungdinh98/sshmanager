const mysql = require('mysql');
require('dotenv').config();

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
    else {
        console.log("connected")
    }
});

projects = [
    {
        project_id: 1001,
        project_name: "project1",
        owner_id: 1001
    },
    {
        project_id: 1002,
        project_name: "project2",
        owner_id: 1002
    },
    {
        project_id: 1003,
        project_name: "project3",
        owner_id: 1003
    },
]

keys = [
    {
        project_id: 1001,
        key_id: 1001,
        key_name: "key1"
    },
    {
        project_id: 1002,
        key_id: 1002,
        key_name: "key2"
    },
    {
        project_id: 1002,
        key_id: 1003,
        key_name: "key3"
    },
    {
        project_id: 1003,
        key_id: 1004,
        key_name: "key4"
    },
    {
        project_id: 1003,
        key_id: 1005,
        key_name: "key5"
    }
]

resources = [
    {
        project_id: 1001,
        resource_name: "resource1",
        resource_dns: "1.1.1.1",
        resource_user: "ubuntu",
        key_id: 1001
    },
    {
        project_id: 1001,
        resource_name: "resource2",
        resource_dns: "2.2.2.2",
        resource_user: "ubuntu",
        key_id: 1001
    },
    {
        project_id: 1002,
        resource_name: "resource3",
        resource_dns: "3.3.3.3",
        resource_user: "ubuntu",
        key_id: 1002
    },
    {
        project_id: 1002,
        resource_name: "resource4",
        resource_dns: "4.4.4.4",
        resource_user: "ubuntu",
        key_id: 1003
    },
    {
        project_id: 1003,
        resource_name: "resource5",
        resource_dns: "5.5.5.5",
        resource_user: "ubuntu",
        key_id: 1004
    },
    {
        project_id: 1003,
        resource_name: "resource6",
        resource_dns: "6.6.6.6",
        resource_user: "ubuntu",
        key_id: 1004
    },
    {
        project_id: 1001,
        resource_name: "resource1",
        resource_dns: "7.7.7.7",
        resource_user: "ubuntu",
        key_id: 1005
    },
]

users = [
    {
        user_id: 1001,
        user_email: "e1@gmail.com",
        user_password: "$2b$10$3MjZKYQtTily46krrezCP.LOyEX.j6cFqiVOL2nFLs.zx6xnAql9a",
        user_firstname: "first1",
        user_lastname: "last1"
    },
    {
        user_id: 1002,
        user_email: "e2@gmail.com",
        user_password: "$2b$10$3MjZKYQtTily46krrezCP.LOyEX.j6cFqiVOL2nFLs.zx6xnAql9a",
        user_firstname: "first2",
        user_lastname: "last2"
    },
    {
        user_id: 1003,
        user_email: "e3@gmail.com",
        user_password: "$2b$10$3MjZKYQtTily46krrezCP.LOyEX.j6cFqiVOL2nFLs.zx6xnAql9a",
        user_firstname: "first3",
        user_lastname: "last3"
    },
    {
        user_id: 1004,
        user_email: "e4@gmail.com",
        user_password: "$2b$10$3MjZKYQtTily46krrezCP.LOyEX.j6cFqiVOL2nFLs.zx6xnAql9a",
        user_firstname: "first4",
        user_lastname: "last4"
    }
]

project_users = [
    {
        project_id: 1001,
        user_id: 1001,
        is_admin: 1
    },
    {
        project_id: 1001,
        user_id: 1003,
        is_admin: 0
    },
    {
        project_id: 1002,
        user_id: 1001,
        is_admin: 0
    },
    {
        project_id: 1002,
        user_id: 1002,
        is_admin: 1
    },
    {
        project_id: 1003,
        user_id: 1003,
        is_admin: 1
    },
    {
        project_id: 1003,
        user_id: 1004,
        is_admin: 0
    }
]

createProject = function() {
    projects.forEach(element => {
        let sql_command = "INSERT INTO `projects` (`project_name`, `project_id`) VALUES (?, ?)"
        connection.query(sql_command, [element.project_name, element.project_id, element.owner_id],
            (err, results) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            })
    });
}

createKeys = function() {
    keys.forEach(element => {
        let sql_command = "INSERT INTO `keys` (`key_id`, `project_id`, `key_name`) VALUES (?, ?, ?)"
        connection.query(sql_command, [element.key_id, element.project_id, element.key_name],
            (err, results) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            })
    })
}

createResources = function() {
    resources.forEach(element => {
        let sql_command = "INSERT INTO `resources` (`project_id`, `resource_name`, `resource_dns`, `resource_user`, `key_id`) VALUES (?, ?, ?, ?, ?)"
        connection.query(sql_command, [element.project_id, element.resource_name, element.resource_dns, element.resource_user, element.key_id],
            (err, results) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            }) 
    })
}

createUsers = function(){
    users.forEach(element => {
        let sql_command = "INSERT INTO `users` (`user_id`, `user_email`, `user_password`, `user_lastname`, `user_firstname`) VALUES (?, ?, ?, ?, ?)"
        connection.query(sql_command, [element.user_id, element.user_email, element.user_password, element.user_lastname, element.user_firstname],
            (err, results) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            }) 
    })
}

createProjectUser = function(){
    project_users.forEach(element => {
        let sql_command = "INSERT INTO `projectUsers` (`user_id`, `project_id`, `is_admin`) VALUES (?, ?, ?)"
        connection.query(sql_command, [element.user_id, element.project_id, element.is_admin],
            (err, results) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            }) 
    })
}

createUsers()
createProject()
createKeys()
createResources()
createProjectUser()

connection.end()
