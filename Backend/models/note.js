// models/note.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Img = require('./img');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
});


Note.hasMany(Img);

module.exports = Note;
