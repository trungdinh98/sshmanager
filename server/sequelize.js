require('dotenv').config();
Sequelize = require('sequelize')


const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;
const DB_NAME = process.env.DB_NAME;

sequelize =  new Sequelize(
    DB_NAME, 
    DB_USER, 
    DB_PASSWD,     
    {
        host: DB_HOST,
        dialect: 'mysql'
    }
)

var Projects = sequelize.define('projects', {
    projectName: {
        type     : Sequelize.STRING,
        allowNull: false
    },
    projectId: {
        type      : Sequelize.STRING, 
        allowNull : false,
        primaryKey: true,
        unique    : true
    },
    projectDate: {
        type        : "TIMESTAMP",
        allowNull   : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
});

var Users = sequelize.define('users', {
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