require('dotenv').config();
Sequelize = require('sequelize')


const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;
// const DB_NAME = process.env.DB_NAME;
const DB_NAME = "test"

sequelize =  new Sequelize(
    DB_NAME, 
    DB_USER, 
    DB_PASSWD,     
    {
        host: DB_HOST,
        dialect: 'mysql'
    }
)

var projects = sequelize.define('projects', {
    project_id: {
        type      : Sequelize.INTEGER, 
        allowNull : false,
        primaryKey: true,
        unique    : true,
        autoIncrement: true
    },
    project_name: {
        type     : Sequelize.STRING,
        allowNull: false
    },
    project_created_at: {
        type        : Sequelize.TIMESTAMP,
        allowNull   : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
});

var resources = sequelize.define('resources', {
    resource_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_id: {
        type: projects
    },
    resource_name: {
        type: 
    }
})

var users = sequelize.define('users', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    }
    
})