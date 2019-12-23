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
        // owner_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        project_created_at: {
            type        : Sequelize.DATE,
            allowNull   : false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
}