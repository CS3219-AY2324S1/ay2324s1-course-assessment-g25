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

/* const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    "development": {
      "username": "postgres",
      "password": "group25",
      "database": "postgres",
      "host": ,
      "port": 5432,
      "dialect": "postgres"
    },
    "test": {
      "username": "postgres",
      "password": "group25",
      "database": "postgres",
      "host": "34.126.94.217",
      "port": 5432,
      "dialect": "postgres"
    },
    "production": {
      "username": "postgres",
      "password": "group25",
      "database": "postgres",
      "host": "34.126.94.217",
      "port": 5432,
      "dialect": "postgres"
    }
  });

  module.exports = sequelize;
   */