const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { User, Transaction } = require('../models');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Transaction,
        as: 'transactions',
        order: [['createdAt', 'DESC']]
      }]
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user (alias for profile)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Transaction,
        as: 'transactions',
        order: [['createdAt', 'DESC']]
      }]
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add points (claim device)
router.post('/claim-device', auth, async (req, res) => {
  try {
    const { device, points } = req.body;

    const user = await User.findByPk(req.userId);
    user.points += points;
    await user.save();

    const transaction = await Transaction.create({
      userId: req.userId,
      type: 'earn',
      device,
      points
    });

    res.json({
      message: 'Points claimed successfully',
      points: user.points,
      transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get transaction history
router.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
