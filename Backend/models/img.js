// models/Img.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Img = sequelize.define('Img', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imgPath: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Img;
