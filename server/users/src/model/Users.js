const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'users';
var Users = sequelize.define(nametable,{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    project: Sequelize.INTEGER,
    age: Sequelize.INTEGER,
    profile: Sequelize.STRING
})

module.exports = Users;