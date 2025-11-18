# E-Waste Facility Locator - XAMPP Setup

## 🚀 Quick Start with XAMPP

### Prerequisites
- XAMPP installed (Download: https://www.apachefriends.org/download.html)
- Node.js installed

---

## 📋 Setup Steps

### Step 1: Start XAMPP MySQL

1. Open **XAMPP Control Panel**
2. Click **"Start"** button next to **MySQL**
3. Wait until status shows **green "Running"**
4. MySQL is now running on port 3306 ✅

### Step 2: Create Database

**Option A: Using phpMyAdmin (Easiest)**

1. Open browser: **http://localhost/phpmyadmin**
2. Click **"New"** in the left sidebar
3. Database name: **ewaste_locator**
4. Click **"Create"** button
5. Done! ✅

**Option B: Using SQL Tab**

1. Go to: **http://localhost/phpmyadmin**
2. Click **"SQL"** tab
3. Paste: `CREATE DATABASE ewaste_locator;`
4. Click **"Go"**
5. Done! ✅

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Seed Products (Optional)

```bash
node scripts/seedProducts.js
```

This adds 6 eco-friendly products to your store.

### Step 5: Start Server

**Option A: Use batch file**
```bash
start-with-xampp.bat
```

**Option B: Manual start**
```bash
npm start
```

**Expected Output:**
```
✅ MySQL connected successfully
✅ Database tables synchronized
🚀 Server running on http://localhost:3000
```

### Step 6: Open Your App

Open browser: **http://localhost:3000**

---

## 🎯 Usage

1. **Register** - Create a new account
2. **E-Dump** - Select device and claim points
3. **Store** - Browse eco-friendly products
4. **Account** - View points and transaction history
5. **Admin** - Manage products and users (admin.html)

---

## 📊 View Database

### Using phpMyAdmin:

1. Go to: **http://localhost/phpmyadmin**
2. Click **ewaste_locator** database
3. View tables:
   - **users** - User accounts with points
   - **transactions** - Points earning/redemption history
   - **products** - Store products
   - **orders** - User orders

---

## 🔧 Configuration

Your `.env` file (already configured):

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ewaste_locator
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**Note:** XAMPP default has no password, so `DB_PASSWORD=` is empty.

---

## ⚠️ Troubleshooting

### MySQL won't start in XAMPP

**Problem:** Port 3306 is already in use

**Solution:**
1. Check if another MySQL is running
2. Stop it from Windows Services
3. Try starting XAMPP MySQL again

### Can't access phpMyAdmin

**Solution:**
- Make sure Apache is also running in XAMPP
- Start both Apache and MySQL

### Server can't connect to database

**Solution:**
1. Verify MySQL is running (green in XAMPP)
2. Check database `ewaste_locator` exists
3. Verify `.env` configuration

---

## 📁 Project Structure

```
capstone/
├── config/
│   └── database.js          # MySQL connection
├── models/
│   ├── User.js              # User model
│   ├── Transaction.js       # Transaction model
│   ├── Product.js           # Product model
│   ├── Order.js             # Order model
│   └── index.js             # Model associations
├── routes/
│   ├── auth.js              # Login/Register
│   ├── users.js             # User management
│   ├── products.js          # Products
│   ├── orders.js            # Orders
│   ├── transactions.js      # Transactions
│   ├── facilities.js        # E-waste facilities
│   └── admin.js             # Admin panel
├── scripts/
│   └── seedProducts.js      # Seed database
├── .env                     # Configuration
├── server.js                # Express server
├── index.html               # Main app (with database)
├── main.html                # Alternative (localStorage)
├── admin.html               # Admin dashboard
└── start-with-xampp.bat     # Quick start script
```

---

## 🎯 Quick Commands

```bash
# Start server
npm start

# Seed products
node scripts/seedProducts.js

# Access phpMyAdmin
# http://localhost/phpmyadmin

# Access application
# http://localhost:3000

# Access admin panel
# http://localhost:3000/admin.html
```

---

## ✅ Success Checklist

- [ ] XAMPP MySQL is running (green)
- [ ] Database `ewaste_locator` created
- [ ] Dependencies installed (`npm install`)
- [ ] Server shows "MySQL connected successfully"
- [ ] Can access http://localhost:3000
- [ ] Can register and login
- [ ] Points are saved to database
- [ ] Can view data in phpMyAdmin

---

## 📞 Support

For issues or questions:
- Check XAMPP MySQL is running
- Verify database exists in phpMyAdmin
- Check server console for errors
- Review `.env` configuration

---

## 🎉 You're All Set!

Your E-Waste Facility Locator is now running with XAMPP MySQL!

**Quick Links:**
- App: http://localhost:3000
- phpMyAdmin: http://localhost/phpmyadmin
- Admin: http://localhost:3000/admin.html

Happy coding! 🚀
