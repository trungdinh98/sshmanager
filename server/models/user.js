module.exports = function(sequelize, Sequelize){
    return sequelize.define('user', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        user_email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        user_password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        user_firstname: {
            type: Sequelize.STRING(50)
        },
        user_lastname: {
            type: Sequelize.STRING(50)
        },
        user_created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        user_linked_url: {
            type: Sequelize.STRING(255)
        },
    },{
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false,
    });
}
