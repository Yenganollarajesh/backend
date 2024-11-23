const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  logging: false,
});

const models = {
  Note: require('./Note')(sequelize, Sequelize.DataTypes),
};

module.exports = { sequelize, ...models };
