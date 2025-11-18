# 🚀 Quick Start Guide

## ✅ Project is Now Running!

### 🌐 Access URLs:

1. **Main Application:** http://localhost:3000
2. **Admin Dashboard:** http://localhost:3000/admin.html
3. **Alternative Version:** http://localhost:3000/main.html

---

## 📱 Main Application Features

### 1. **Home Page**
- Project overview
- Why e-waste recycling matters
- Contact information
- Quick navigation

### 2. **E-Dump Section**
- 🗺️ Interactive map with e-waste facilities
- 📍 Click any facility marker to get directions
- 🔵 Blue route line from your location to destination
- 💰 Device value estimator (earn points)

### 3. **Store Section**
- Browse eco-friendly products
- See stock availability (In Stock/Low Stock/Out of Stock)
- Add items to cart
- Redeem with points

### 4. **Account Section**
- View your points balance
- Transaction history
- Order tracking

---

## 👨‍💼 Admin Dashboard

Access: http://localhost:3000/admin.html

**Statistics:**
- Total Products, Stock, Sold items
- Total Users and Points
- Recent Orders

**Tables:**
- Products Inventory (with stock management)
- Registered Users
- Recent Orders

---

## 🧪 Run Tests

```bash
npm test
```

**15 comprehensive tests covering:**
- Authentication
- Product management
- Order processing
- Stock management
- Admin APIs

---

## 🛠️ Useful Commands

```bash
# Start server
npm start

# Run tests
npm test

# Seed products
node scripts/seedProducts.js

# Fix stock calculations
node scripts/fixStockCalculation.js
```

---

## 📊 Test Accounts

Create your own account or use existing ones from the database.

**Default Points:** 0 (earn by recycling devices)

---

## 🎯 How to Use

1. **Register/Login** on main page
2. **Go to E-Dump** → Select device → Claim points
3. **Browse Store** → Add items to cart
4. **Checkout** with your points
5. **Check Admin Panel** to see updated stock

---

## 📝 Key Features

✅ Real-time stock management
✅ Points system for recycling
✅ Interactive map with routing
✅ Order tracking
✅ Admin dashboard
✅ Sold items tracking
✅ Stock formula: Remaining = Initial - Sold

---

## 🔧 Troubleshooting

**Server not starting?**
- Check if MySQL is running (XAMPP)
- Check port 3000 is available

**Database errors?**
- Run: `node scripts/seedProducts.js`

**Stock issues?**
- Run: `node scripts/fixStockCalculation.js`

---

## 📚 Documentation

- **README.md** - Full project documentation
- **TEST_DOCUMENTATION.md** - Test suite details
- **PROJECT_STRUCTURE.md** - File organization
- **XAMPP_SETUP.md** - Database setup

---

Enjoy using the E-Waste Facility Locator! 🌱
