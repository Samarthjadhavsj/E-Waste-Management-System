# E-Waste Facility Locator

A web application for locating certified e-waste collection centers, estimating device recycling value, and redeeming eco-friendly products with earned points.

## 🚀 Features

- **E-Waste Collection Centers Map** - Find nearby certified recycling facilities
- **Device Value Estimator** - Calculate points for recycling your devices
- **Points System** - Earn points by recycling electronics
- **Eco-Store** - Redeem points for sustainable products
- **User Accounts** - Track your points and transaction history
- **Admin Dashboard** - Manage products, users, and orders

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Maps**: Leaflet.js

## 📋 Prerequisites

- Node.js (v14 or higher)
- XAMPP (includes MySQL + phpMyAdmin)
- npm or yarn

## ⚡ Quick Start

### 1. Install XAMPP

- Download: https://www.apachefriends.org/download.html
- Install XAMPP
- Open XAMPP Control Panel
- Click "Start" for MySQL

### 2. Create Database

1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Click "New" in left sidebar
3. Database name: `ewaste_locator`
4. Click "Create"

### 3. Install Dependencies

```bash
npm install
```

### 4. Seed Products (Optional)

```bash
node scripts/seedProducts.js
```

### 5. Start Server

**Quick Start:**
```bash
start-with-xampp.bat
```

**Or manually:**
```bash
npm start
```

Server will run on: http://localhost:3000

**Note:** Your `.env` is already configured for XAMPP (no password needed)

## 📁 Project Structure

```
capstone/
├── config/
│   └── database.js          # MySQL connection config
├── middleware/
│   └── auth.js              # JWT authentication
├── models/
│   ├── User.js              # User model
│   ├── Transaction.js       # Transaction model
│   ├── Product.js           # Product model
│   ├── Order.js             # Order model
│   └── index.js             # Model associations
├── routes/
│   ├── auth.js              # Login/Register routes
│   ├── users.js             # User management routes
│   ├── products.js          # Product routes
│   ├── orders.js            # Order routes
│   ├── transactions.js      # Transaction routes
│   ├── facilities.js        # Facility routes
│   └── admin.js             # Admin routes
├── scripts/
│   └── seedProducts.js      # Seed database with products
├── .env                     # Environment variables
├── server.js                # Express server
├── index.html               # Main frontend (with database)
├── main.html                # Alternative frontend (localStorage)
└── admin.html               # Admin dashboard

```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `POST /api/users/claim-device` - Claim points for device
- `GET /api/users/transactions` - Get transaction history

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders

### Facilities
- `GET /api/facilities` - Get all facilities
- `GET /api/facilities/nearest` - Get nearest facilities

## 💾 Database Schema

### Users Table
- id, name, email, password, points, createdAt, updatedAt

### Transactions Table
- id, userId, type, device, action, points, address, createdAt, updatedAt

### Products Table
- id, name, description, price, image, createdAt, updatedAt

### Orders Table
- id, userId, items (JSON), totalPoints, deliveryAddress, status, createdAt, updatedAt

## 🎯 Usage

1. **Register/Login** - Create an account or login
2. **Go to E-Dump** - Select a device type
3. **Calculate & Claim** - Earn points for your device
4. **Browse Store** - View eco-friendly products
5. **Redeem Points** - Purchase products with your points
6. **Check Account** - View points and transaction history

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Seed database
node scripts/seedProducts.js
```

## 📝 License

MIT License

## 👥 Contributors

- Your Name

## 📞 Support

For issues or questions, contact: support@ewaste-locator.com
