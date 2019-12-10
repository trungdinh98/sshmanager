'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.sync()
    .catch(function (err) {
        console.log(err);
    });

let models = [
  'project',
  'user',
  'project_user',
  'resource',
  'key'
]

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m){
  m.project.hasMany(m.resource, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE', hooks: true});
  m.project.hasMany(m.key, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE', hooks: true});
  m.key.belongsTo(m.project, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE', hooks: true});
  m.resource.belongsTo(m.project, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE', hooks: true});
  m.user.belongsToMany(m.project, {through: 'project_user', foreignKey: 'user_id'});
  m.project.belongsToMany(m.user, {through: 'project_user', foreignKey: 'project_id'});
})(module.exports);
module.exports.sequelize = sequelize;
