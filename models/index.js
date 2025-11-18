const sequelize = require('../config/database');
const User = require('./User');
const Transaction = require('./Transaction');
const Product = require('./Product');
const Order = require('./Order');

// Define associations
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Transaction,
  Product,
  Order
};
