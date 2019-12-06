'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    project_id: DataTypes.INTEGER,
    project_name: DataTypes.STRING,
    project_created_at: DataTypes.DATE
  }, {});
  Projects.associate = function(models) {
    // associations can be defined here
  };
  return Projects;
};