module.exports = {
    HOST: "34.126.94.217",
    USER: "postgres",
    PASSWORD: "group25",
    DB: "postgres",
    dialect: "postgres",
    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}