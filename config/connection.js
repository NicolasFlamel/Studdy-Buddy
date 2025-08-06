const { Sequelize } = require('sequelize');
require('dotenv').config({ quiet: true });

const {
  DB_NAME_PSQL,
  DB_RENDER_USER_PSQL,
  DB_RENDER_PASSWORD_PSQL,
  DB_HOST,
  DB_RENDER_PORT,
} = process.env;

const sequelize = new Sequelize(
  DB_NAME_PSQL,
  DB_RENDER_USER_PSQL,
  DB_RENDER_PASSWORD_PSQL,
  {
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_RENDER_PORT,
    logging: false,
  },
);

module.exports = sequelize;
