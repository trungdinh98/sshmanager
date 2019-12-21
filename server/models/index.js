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
  'user',
  'project',
  'projectUser',
  'resource',
  'key',
  'sshLog'
]

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m){
  // m.user.hasMany(m.project, {foreignKey: {name: 'owner_id', allowNull: false}, onDelete: 'CASCADE'})
  
  m.user.belongsToMany(m.project, {through: "projectUser", foreignKey: 'user_id'});
  m.project.belongsToMany(m.user, {through: "projectUser", foreignKey: 'project_id'});

  m.project.hasMany(m.resource, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE'});
  m.project.hasMany(m.key, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE'});
  m.key.belongsTo(m.project, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE'});
  m.resource.belongsTo(m.project, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE'});
  
  m.project.hasMany(m.sshLog, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE'})
  m.sshLog.belongsTo(m.project, {foreignKey: {name: 'project_id', allowNull: false}, onDelete: 'CASCADE'})

})(module.exports);
module.exports.sequelize = sequelize;
