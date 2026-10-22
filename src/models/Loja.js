const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
 
const Livro = sequelize.define('Loja', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
 
module.exports = Loja;
