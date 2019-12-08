module.exports = function(sequelize, Sequelize){
    return sequelize.define('project', {
        project_name: {
            type     : Sequelize.STRING,
        },
        project_id: {
            type      : Sequelize.INTEGER, 
            allowNull : false,
            primaryKey: true,
            unique    : true,
            autoIncrement: true
        },
        project_created_at: {
            type        : Sequelize.DATE,
            allowNull   : false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps: false,
    });
}