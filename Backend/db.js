const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Notes_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306'
});

sequelize.authenticate()
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
