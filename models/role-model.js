const  { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define("user_role", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true
        },
        role_name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
    }, { });
    return Role;
};