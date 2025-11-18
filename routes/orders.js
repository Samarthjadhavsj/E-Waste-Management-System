const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Order, User, Product, Transaction } = require('../models');

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;

    const user = await User.findByPk(req.userId);
    
    let totalPoints = 0;
    const orderItems = [];
    const productsToUpdate = [];

    // Validate all items first
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      
      const quantity = item.quantity || 1;
      
      // Check stock availability
      if (product.stock < quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${quantity}` 
        });
      }
      
      totalPoints += product.price * quantity;
      orderItems.push({
        product: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
      
      productsToUpdate.push({ product, quantity });
    }

    if (user.points < totalPoints) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    // Create order
    const order = await Order.create({
      userId: req.userId,
      items: orderItems,
      totalPoints,
      deliveryAddress
    });

    // Update user points
    user.points -= totalPoints;
    await user.save();

    // Update product stock, sold count, and status
    for (let { product, quantity } of productsToUpdate) {
      product.stock -= quantity;
      product.sold = (product.sold || 0) + quantity; // Increment sold count
      
      // Update status based on stock level
      if (product.stock === 0) {
        product.status = 'Out of Stock';
      } else if (product.stock <= 10) {
        product.status = 'Low Stock';
      } else {
        product.status = 'In Stock';
      }
      
      await product.save();
    }

    // Create transaction record
    await Transaction.create({
      userId: req.userId,
      type: 'redeem',
      action: 'Order placed',
      points: -totalPoints,
      address: deliveryAddress
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
      remainingPoints: user.points,
      itemsOrdered: orderItems.length,
      totalPoints: totalPoints
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
