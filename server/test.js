require('dotenv').config();
// const sequelize = require
const db = require('./models/index')
db.sequelize.sync().then(() => {
    console.log("aaa");
})

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
