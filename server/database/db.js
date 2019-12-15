require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;
const DB_NAME = process.env.DB_NAME;

const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWD, {
  host: DB_HOST,
  dialect: 'mysql',
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;
