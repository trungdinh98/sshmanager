module.exports = function(sequelize, Sequelize){
    return sequelize.define('resource', {
        resource_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        project_id: {
            type: Sequelize.INTEGER
        },
        resource_name: {
            type: Sequelize.STRING(30)
        },
        resource_dns: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        resource_user: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        key_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        resource_created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps: false,
    });
}
