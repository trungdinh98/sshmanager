var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'ministore',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;