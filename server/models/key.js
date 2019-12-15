const db = require('../database/db.js');
const Sequelize = require('sequelize');

module.exports = db.sequelize.define(
    'key',
    {
        key_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        key_name: {
            type: Sequelize.STRING(30)
        },
        key_created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps: false,
    }
)
