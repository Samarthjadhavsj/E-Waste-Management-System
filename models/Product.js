const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'eco-friendly'
  },
  initialStock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  maxOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  status: {
    type: DataTypes.ENUM('In Stock', 'Low Stock', 'Out of Stock'),
    defaultValue: 'In Stock'
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
