module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "mm-cp-db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    SECRET_KEY: "MM-CODING-PLATFORM"
};