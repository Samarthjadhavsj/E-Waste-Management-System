const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./models');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected successfully');
    return sequelize.sync({ alter: true }); // Creates tables if they don't exist
  })
  .then(() => console.log('✅ Database tables synchronized'))
  .catch(err => console.error('❌ MySQL connection error:', err));

// API Routes (must come before static files)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/facilities', require('./routes/facilities'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/admin', require('./routes/admin'));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve static files (CSS, JS, images) - must come after routes
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
