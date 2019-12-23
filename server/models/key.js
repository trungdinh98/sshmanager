module.exports = function(sequelize, Sequelize){
    return sequelize.define('key', {
        key_id: {
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
        key_name: {
            type: Sequelize.STRING(30)
        },
        key_created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
}
