var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'sshmanager',
    'root',
    '12345678',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;