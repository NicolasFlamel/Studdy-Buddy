const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME_PSQL,
  process.env.DB_RENDER_USER_PSQL,
  process.env.DB_RENDER_PASSWORD_PSQL,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_RENDER_PORT,
    logging: false,
  },
);

module.exports = sequelize;
