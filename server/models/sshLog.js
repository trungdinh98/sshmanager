module.exports = function(sequelize, Sequelize){
    return sequelize.define('sshLog', {
        log_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        log_name: {
            type: Sequelize.STRING(25),
            allowNull: false
        },
        log_created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps: false,
    });
}
