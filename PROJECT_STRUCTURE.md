# E-Waste Facility Locator - Project Structure

## 📁 Root Directory

```
capstone/
├── 📄 Configuration Files
│   ├── .env                      # Environment variables (DB config)
│   ├── .gitignore               # Git ignore rules
│   ├── package.json             # Node.js dependencies
│   └── package-lock.json        # Locked dependency versions
│
├── 📄 Documentation
│   ├── README.md                # Main project documentation
│   ├── START_HERE.md            # Quick start guide
│   ├── XAMPP_SETUP.md           # XAMPP setup instructions
│   └── PROJECT_STRUCTURE.md     # This file
│
├── 🌐 Frontend Files
│   ├── index.html               # Main app (with database integration)
│   ├── main.html                # Alternative frontend (localStorage)
│   └── admin.html               # Admin dashboard
│
├── ⚙️ Backend Files
│   └── server.js                # Express server entry point
│
├── 🧪 Testing
│   └── test.js                  # Comprehensive test suite (15 tests)
│
├── 🚀 Utility Scripts
│   └── start-with-xampp.bat     # Windows batch file to start server
│
└── 📂 Directories (see below)
```

---

## 📂 Directory Structure

### `/config` - Configuration
```
config/
└── database.js                  # MySQL/Sequelize configuration
```

### `/middleware` - Express Middleware
```
middleware/
└── auth.js                      # JWT authentication middleware
```

### `/models` - Database Models (Sequelize ORM)
```
models/
├── index.js                     # Model associations & exports
├── User.js                      # User model (auth, points)
├── Product.js                   # Product model (inventory)
├── Order.js                     # Order model (purchases)
└── Transaction.js               # Transaction model (history)
```

### `/routes` - API Routes
```
routes/
├── auth.js                      # POST /api/auth/login, /register
├── users.js                     # GET /api/users/me, POST /claim-device
├── products.js                  # GET /api/products, /products/:id
├── orders.js                    # POST /api/orders, GET /my-orders
├── transactions.js              # GET /api/transactions
├── facilities.js                # GET /api/facilities
└── admin.js                     # GET /api/admin/* (dashboard data)
```

### `/scripts` - Maintenance Scripts
```
scripts/
├── seedProducts.js              # Seed database with initial products
├── updateOrderStatus.js         # Update order status to "Order Placed"
├── fixOrdersAndRecalculate.js   # Recalculate sold counts from orders
└── fixStockCalculation.js       # Fix stock: Initial - Sold = Remaining
```

### `/public` - Static Assets
```
public/
└── api.js                       # Frontend API helper functions
```

---

## 🗂️ File Organization by Purpose

### 🎯 Entry Points
1. **server.js** - Backend server
2. **index.html** - Main frontend (database version)
3. **admin.html** - Admin dashboard

### 🔧 Configuration
1. **.env** - Database credentials
2. **config/database.js** - Sequelize setup

### 🔐 Authentication
1. **middleware/auth.js** - JWT verification
2. **routes/auth.js** - Login/Register endpoints

### 💾 Database Layer
1. **models/** - Data models
2. **routes/** - API endpoints

### 🛠️ Maintenance
1. **scripts/** - Database utilities

---

## 📊 Data Flow

```
Frontend (HTML)
    ↓
API Routes (/routes)
    ↓
Middleware (/middleware/auth.js)
    ↓
Models (/models)
    ↓
Database (MySQL via Sequelize)
```

---

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Seed products
node scripts/seedProducts.js

# Start server
npm start

# Fix stock calculations
node scripts/fixStockCalculation.js
```

---

## 📝 Notes

- **index.html** uses database (recommended)
- **main.html** uses localStorage (offline mode)
- All API routes are prefixed with `/api`
- Admin routes require authentication
- Stock formula: `Remaining = Initial - Sold`
