const dbConfig = require("../app/config/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.sequelize = sequelize;
db.user = require('./user-model.js')(sequelize);
// db.userRole = require('./role-model')(sequelize);
// db.userRole.hasMany(db.user);
// db.user.belongsTo(db.userRole, {
//     foreignKey: { name: "role_id", allowNull: false }
// });

module.exports = db;