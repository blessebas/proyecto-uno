const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  define: {
    timestamps: false, // te agrega 2 registros cuando fue creado y cuando fue actualizado
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // operatorsAliases: false deprecated
});

module.exports = db;
