const express = require('express');
const router = express.Router();
const { User, Product, Order } = require('../models');

// Get all products with statistics
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['name', 'ASC']] });

    const stats = {
      totalProducts: products.length,
      totalStock: products.reduce((sum, p) => sum + (p.stock || 0), 0),
      totalSold: products.reduce((sum, p) => sum + (p.sold || 0), 0),
      lowStock: products.filter(p => (p.stock || 0) < 40).length,
      totalValue: products.reduce((sum, p) => sum + ((p.stock || 0) * p.price), 0)
    };

    res.json({ products, stats });
  } catch (error) {
    console.error('Admin products error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users with statistics
router.get('/users', async (req, res) => {
  try {
    const { Transaction } = require('../models');
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: Transaction,
        as: 'transactions',
        required: false
      }],
      order: [['createdAt', 'DESC']]
    });

    const stats = {
      totalUsers: users.length,
      totalPoints: users.reduce((sum, u) => sum + (u.points || 0), 0)
    };

    res.json({ users, stats });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    const stats = {
      totalOrders: orders.length,
      totalPointsSpent: orders.reduce((sum, o) => sum + (o.totalPoints || 0), 0),
      pendingOrders: orders.filter(o => o.status === 'pending').length
    };

    res.json({ orders, stats });
  } catch (error) {
    console.error('Admin orders error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard summary
router.get('/dashboard', async (req, res) => {
  try {
    const [products, users, orders] = await Promise.all([
      Product.findAll(),
      User.findAll({ attributes: { exclude: ['password'] } }),
      Order.findAll()
    ]);

    const summary = {
      products: {
        total: products.length,
        totalValue: products.reduce((sum, p) => sum + p.price, 0)
      },
      users: {
        total: users.length,
        totalPoints: users.reduce((sum, u) => sum + u.points, 0)
      },
      orders: {
        total: orders.length,
        totalPointsSpent: orders.reduce((sum, o) => sum + o.totalPoints, 0),
        pending: orders.filter(o => o.status === 'pending').length
      }
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
