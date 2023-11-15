'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config/config');
const AttemptedQuestions = require('./attemptedQuestions');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }); */
db.AttemptedQuestions = require('../models/attemptedQuestions')(sequelize, Sequelize.DataTypes)

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');

    // Start your Express server or perform other application tasks here
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;