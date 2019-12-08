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

const Model = Sequelize.Model

module.exports = function(sequelize, Sequelize){
    var projects = sequelize.define('projects', {
        project_name: {
            type     : Sequelize.STRING,
        },
        project_id: {
            type      : Sequelize.INTEGER, 
            allowNull : false,
            primaryKey: true,
            unique    : true
        },
        project_created_at: {
            type        : Sequelize.DATE,
            allowNull   : false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    });
    
    var users = sequelize.define('users', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        user_email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        user_firstname: {
            type: Sequelize.STRING(50)
        },
        user_lastname: {
            type: Sequelize.STRING(50)
        },
        user_created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    });

    var project_users = sequelize.define('project_users', {
        project_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        is_admin: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_joined_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    })

    var resources = sequelize.define('resources', {
        resource_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        project_id: {
            type: Sequelize.INTEGER
        },
        resource_name: {
            type: Sequelize.STRING(30)
        },
        resource_dns: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        key_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        resource_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    })

    var keys = sequelize.define('keys', {
        key_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        project_id: {
            type: Sequelize.INTEGER
        },
        key_name: {
            type: Sequelize.STRING(30)
        },
        key_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    })
}


// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('projects', {
//       project_id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       project_name: {
//         allowNull: false,
//         type: Sequelize.STRING(100)
//       },
//       project_created_at: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('projects');
//   }
// };
