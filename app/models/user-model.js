const  { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { });
    return User;
};