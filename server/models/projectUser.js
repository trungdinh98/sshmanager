module.exports = function(sequelize, Sequelize){
    sequelize.define('projectUser', {
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        user_joined_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps: false,
    });
}