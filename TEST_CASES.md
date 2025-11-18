# E-Waste Facility Locator - Test Cases

## Test Case Documentation

This document contains all test cases for the E-Waste Facility Locator application.

---

## 1. Authentication & User Management

### TC-001: User Registration
**Objective:** Verify that a new user can register successfully

**Preconditions:**
- Server is running
- Database is accessible
- Email is unique

**Test Steps:**
1. Navigate to main page
2. Click "Login / Register"
3. Click "New user? Register"
4. Enter name: "Test User"
5. Enter email: "testuser@example.com"
6. Enter password: "test123"
7. Click "Register"

**Expected Result:**
- ✅ User account created
- ✅ JWT token generated
- ✅ User redirected to main app
- ✅ Success message displayed
- ✅ User role set to 'user'

**Actual Result:** Pass ✅

---

### TC-002: User Login (Regular User)
**Objective:** Verify regular user can login successfully

**Preconditions:**
- User account exists
- Correct credentials provided

**Test Steps:**
1. Navigate to main page
2. Click "Login / Register"
3. Enter email: "sam@gmail.com"
4. Enter password: (user password)
5. Click "Login"

**Expected Result:**
- ✅ Login successful
- ✅ JWT token stored
- ✅ User stays on main app
- ✅ Admin button is HIDDEN
- ✅ User can access: Home, E-Dump, Store, Account

**Actual Result:** Pass ✅

---

### TC-003: Admin Login
**Objective:** Verify admin user is redirected to admin dashboard

**Preconditions:**
- Admin account exists (admin@gmail.com)
- Correct credentials provided

**Test Steps:**
1. Navigate to main page
2. Click "Login / Register"
3. Enter email: "admin@gmail.com"
4. Enter password: "admin@123"
5. Click "Login"

**Expected Result:**
- ✅ Login successful
- ✅ Automatically redirected to admin dashboard
- ✅ Cannot access main app sections
- ✅ Admin dashboard loads with statistics

**Actual Result:** Pass ✅

---

### TC-004: Invalid Login
**Objective:** Verify system rejects invalid credentials

**Test Steps:**
1. Navigate to main page
2. Click "Login / Register"
3. Enter email: "invalid@example.com"
4. Enter password: "wrongpassword"
5. Click "Login"

**Expected Result:**
- ❌ Login fails
- ❌ Error message: "Invalid credentials"
- ❌ User not authenticated

**Actual Result:** Pass ✅

---

### TC-005: Logout
**Objective:** Verify user can logout successfully

**Test Steps:**
1. Login as any user
2. Click "Logout" button

**Expected Result:**
- ✅ Token removed from localStorage
- ✅ User data cleared
- ✅ Redirected to login state
- ✅ Success message displayed

**Actual Result:** Pass ✅

---

## 2. Points System

### TC-006: Claim Device Points
**Objective:** Verify user can claim points for recycling devices

**Preconditions:**
- User is logged in
- Device type selected

**Test Steps:**
1. Login as user
2. Navigate to E-Dump section
3. Select device: "Smartphone"
4. Click "Calculate & Claim"

**Expected Result:**
- ✅ Points calculated (50-100 pts)
- ✅ Points added to user account
- ✅ Transaction recorded in database
- ✅ Success message displayed
- ✅ Points visible in header and account section

**Actual Result:** Pass ✅

---

### TC-007: View Transaction History
**Objective:** Verify user can view their transaction history

**Test Steps:**
1. Login as user
2. Navigate to Account section
3. View transaction history

**Expected Result:**
- ✅ All transactions displayed
- ✅ Shows: device/action, points, date
- ✅ Sorted by date (newest first)
- ✅ Includes both earned and spent points

**Actual Result:** Pass ✅

---

## 3. Product Management

### TC-008: View Products
**Objective:** Verify products are displayed correctly

**Test Steps:**
1. Navigate to Store section
2. View product list

**Expected Result:**
- ✅ All products displayed
- ✅ Shows: name, image, description, price
- ✅ Stock status badge visible
- ✅ Products loaded from database

**Actual Result:** Pass ✅

---

### TC-009: Product Stock Status - In Stock
**Objective:** Verify in-stock products display correctly

**Test Steps:**
1. Navigate to Store section
2. Find product with stock > 10

**Expected Result:**
- ✅ Green badge: "X in stock"
- ✅ "Add to Cart" button enabled
- ✅ Can add to cart

**Actual Result:** Pass ✅

---

### TC-010: Product Stock Status - Low Stock
**Objective:** Verify low-stock products display correctly

**Test Steps:**
1. Navigate to Store section
2. Find product with stock ≤ 10

**Expected Result:**
- ✅ Orange badge: "Only X left"
- ✅ "Add to Cart" button enabled
- ✅ Can add to cart

**Actual Result:** Pass ✅

---

### TC-011: Product Stock Status - Out of Stock
**Objective:** Verify out-of-stock products display correctly

**Test Steps:**
1. Navigate to Store section
2. Find Solar Power Bank (stock = 0)

**Expected Result:**
- ✅ Red badge: "Out of Stock"
- ✅ Button disabled and grayed out
- ✅ Button text: "Out of Stock"
- ✅ Cannot add to cart

**Actual Result:** Pass ✅

---

## 4. Shopping Cart & Orders

### TC-012: Add Product to Cart
**Objective:** Verify user can add products to cart

**Test Steps:**
1. Login as user
2. Navigate to Store section
3. Click "Add to Cart" on any in-stock product

**Expected Result:**
- ✅ Product added to cart
- ✅ Cart count increases
- ✅ Success feedback

**Actual Result:** Pass ✅

---

### TC-013: View Cart
**Objective:** Verify cart displays correctly

**Test Steps:**
1. Add products to cart
2. Click "View Cart"

**Expected Result:**
- ✅ Cart modal opens
- ✅ All items displayed
- ✅ Total points calculated correctly
- ✅ Delivery address field visible
- ✅ Can remove items

**Actual Result:** Pass ✅

---

### TC-014: Place Order - Successful
**Objective:** Verify user can place order successfully

**Preconditions:**
- User has sufficient points
- Products in cart are in stock
- Delivery address provided

**Test Steps:**
1. Add Bamboo Toothbrush (120 pts) to cart
2. User has 175+ points
3. Click "View Cart"
4. Enter delivery address
5. Click "Checkout with Points"

**Expected Result:**
- ✅ Order created successfully
- ✅ Points deducted (175 - 120 = 55)
- ✅ Stock reduced by 1
- ✅ Sold count increased by 1
- ✅ Order status: "Order Placed"
- ✅ Transaction recorded
- ✅ Cart cleared
- ✅ Success message with order details

**Actual Result:** Pass ✅

---

### TC-015: Place Order - Insufficient Points
**Objective:** Verify order fails with insufficient points

**Test Steps:**
1. Add Solar Power Bank (1200 pts) to cart
2. User has only 100 points
3. Click "Checkout with Points"

**Expected Result:**
- ❌ Order fails
- ❌ Error message: "Insufficient points"
- ❌ No changes to stock
- ❌ No transaction recorded

**Actual Result:** Pass ✅

---

### TC-016: Place Order - Out of Stock
**Objective:** Verify order fails for out-of-stock items

**Test Steps:**
1. Try to add Solar Power Bank (stock = 0)

**Expected Result:**
- ❌ Cannot add to cart
- ❌ Button is disabled
- ❌ No order can be placed

**Actual Result:** Pass ✅

---

### TC-017: Place Order - Missing Delivery Address
**Objective:** Verify order requires delivery address

**Test Steps:**
1. Add product to cart
2. Click "View Cart"
3. Leave delivery address empty
4. Click "Checkout with Points"

**Expected Result:**
- ❌ Order fails
- ❌ Error message: "Please enter your delivery address"
- ❌ Focus on address field

**Actual Result:** Pass ✅

---

## 5. Stock Management

### TC-018: Stock Reduction on Order
**Objective:** Verify stock reduces when order is placed

**Test Steps:**
1. Note current stock of product (e.g., 147)
2. Place order for 1 unit
3. Check stock after order

**Expected Result:**
- ✅ Stock reduced by 1 (147 → 146)
- ✅ Sold count increased by 1 (3 → 4)
- ✅ Formula verified: Initial - Sold = Remaining
- ✅ Changes saved to database

**Actual Result:** Pass ✅

---

### TC-019: Stock Status Update
**Objective:** Verify stock status updates automatically

**Test Steps:**
1. Product with stock = 11 → Place order
2. Stock becomes 10

**Expected Result:**
- ✅ Status changes from "In Stock" to "Low Stock"
- ✅ Badge color changes from green to orange

**Test Steps:**
1. Product with stock = 1 → Place order
2. Stock becomes 0

**Expected Result:**
- ✅ Status changes to "Out of Stock"
- ✅ Badge color changes to red
- ✅ Button becomes disabled

**Actual Result:** Pass ✅

---

### TC-020: Stock Calculation Formula
**Objective:** Verify stock calculation is correct

**Test Steps:**
1. Check all products in database
2. Verify: Remaining = Initial - Sold

**Expected Result:**
- ✅ Bamboo Toothbrush: 150 - 5 = 145 ✓
- ✅ Reusable Tote Bag: 200 - 3 = 197 ✓
- ✅ Solar Power Bank: 75 - 75 = 0 ✓
- ✅ All products match formula

**Actual Result:** Pass ✅

---

## 6. E-Waste Facilities & Map

### TC-021: View Facilities Map
**Objective:** Verify map displays e-waste facilities

**Test Steps:**
1. Navigate to E-Dump section
2. View map

**Expected Result:**
- ✅ Map loads successfully
- ✅ 17 facility markers displayed
- ✅ Markers are clickable
- ✅ Facility names and addresses shown

**Actual Result:** Pass ✅

---

### TC-022: Get User Location
**Objective:** Verify system can get user's location

**Test Steps:**
1. Navigate to E-Dump section
2. Allow location access

**Expected Result:**
- ✅ Location permission requested
- ✅ User location detected
- ✅ Blue marker placed on map
- ✅ Map centered on user location
- ✅ Success message displayed

**Actual Result:** Pass ✅

---

### TC-023: Get Directions to Facility
**Objective:** Verify routing from user location to facility

**Test Steps:**
1. Allow location access
2. Click on any facility marker
3. Popup appears with facility details

**Expected Result:**
- ✅ Route line appears (blue color)
- ✅ Route follows actual roads
- ✅ Turn-by-turn directions displayed
- ✅ Distance and time shown
- ✅ Blue marker at start (user location)
- ✅ Green marker at destination (facility)

**Actual Result:** Pass ✅

---

### TC-024: Search Location
**Objective:** Verify location search functionality

**Test Steps:**
1. Navigate to E-Dump section
2. Use search bar
3. Enter "Bengaluru"

**Expected Result:**
- ✅ Search results appear
- ✅ Map centers on searched location
- ✅ Marker placed at location
- ✅ Nearby facilities visible

**Actual Result:** Pass ✅

---

## 7. Admin Dashboard

### TC-025: Admin Access Control
**Objective:** Verify only admins can access dashboard

**Test Steps:**
1. Login as regular user
2. Try to access /admin.html directly

**Expected Result:**
- ❌ Access denied
- ❌ Redirected to main app
- ❌ Alert: "Access Denied! Admin access required"

**Actual Result:** Pass ✅

---

### TC-026: Admin Dashboard - Products Stats
**Objective:** Verify product statistics are correct

**Test Steps:**
1. Login as admin
2. View Products Inventory section

**Expected Result:**
- ✅ Total Products: 6
- ✅ Total Stock: (sum of all stock)
- ✅ Total Sold: (sum of all sold)
- ✅ Low Stock Items: (count of stock ≤ 10)
- ✅ Total Value: (sum of stock × price)

**Actual Result:** Pass ✅

---

### TC-027: Admin Dashboard - Products Table
**Objective:** Verify products table displays correctly

**Test Steps:**
1. Login as admin
2. View Products Inventory table

**Expected Result:**
- ✅ All 6 products listed
- ✅ Columns: Name, Category, Price, Initial, Sold, Remaining, Status
- ✅ Solar Power Bank shows:
  - Initial: 75
  - Sold: 75 (red)
  - Remaining: 0
  - Status: Out of Stock (red badge)

**Actual Result:** Pass ✅

---

### TC-028: Admin Dashboard - Users Stats
**Objective:** Verify user statistics are correct

**Test Steps:**
1. Login as admin
2. View Registered Users section

**Expected Result:**
- ✅ Total Users: (count)
- ✅ Total Points: (sum of all user points)
- ✅ User list with: Name, Email, Points, Transactions

**Actual Result:** Pass ✅

---

### TC-029: Admin Dashboard - Orders Stats
**Objective:** Verify order statistics are correct

**Test Steps:**
1. Login as admin
2. View Recent Orders section

**Expected Result:**
- ✅ Total Orders: (count)
- ✅ Total Points Spent: (sum)
- ✅ Order list with: ID, User, Items, Points, Address, Status, Date
- ✅ All orders show status: "Order Placed"

**Actual Result:** Pass ✅

---

### TC-030: Admin Logout
**Objective:** Verify admin can logout

**Test Steps:**
1. Login as admin
2. Click "Logout" button
3. Confirm logout

**Expected Result:**
- ✅ Confirmation dialog appears
- ✅ Token removed
- ✅ Redirected to main page
- ✅ Success message displayed

**Actual Result:** Pass ✅

---

## 8. Role-Based Access Control

### TC-031: User Role - Navigation
**Objective:** Verify regular users don't see admin button

**Test Steps:**
1. Login as regular user (sam@gmail.com)
2. Check navigation bar

**Expected Result:**
- ✅ Buttons visible: Home, E-Dump, Store, Account, Logout
- ❌ Admin button is HIDDEN
- ✅ Cannot access admin dashboard

**Actual Result:** Pass ✅

---

### TC-032: Admin Role - Redirect
**Objective:** Verify admin is redirected on login

**Test Steps:**
1. Login as admin (admin@gmail.com)

**Expected Result:**
- ✅ Automatically redirected to /admin.html
- ✅ Cannot access main app sections
- ✅ Dashboard loads immediately

**Actual Result:** Pass ✅

---

## 9. Database Operations

### TC-033: Database Connection
**Objective:** Verify database connection is successful

**Test Steps:**
1. Start server
2. Check console logs

**Expected Result:**
- ✅ "MySQL connected successfully"
- ✅ "Database tables synchronized"
- ✅ No connection errors

**Actual Result:** Pass ✅

---

### TC-034: Data Persistence
**Objective:** Verify data persists across sessions

**Test Steps:**
1. Create order
2. Restart server
3. Check order still exists

**Expected Result:**
- ✅ Order data persists
- ✅ Stock changes persist
- ✅ User points persist
- ✅ Transactions persist

**Actual Result:** Pass ✅

---

## 10. API Endpoints

### TC-035: GET /api/products
**Objective:** Verify products API returns correct data

**Test Steps:**
1. Send GET request to /api/products

**Expected Result:**
- ✅ Status: 200 OK
- ✅ Returns array of products
- ✅ Each product has: id, name, price, stock, sold, status

**Actual Result:** Pass ✅

---

### TC-036: POST /api/auth/login
**Objective:** Verify login API works correctly

**Test Steps:**
1. Send POST to /api/auth/login
2. Body: { email, password }

**Expected Result:**
- ✅ Status: 200 OK
- ✅ Returns: token, user object
- ✅ User object includes: id, name, email, points, role

**Actual Result:** Pass ✅

---

### TC-037: POST /api/orders
**Objective:** Verify order creation API

**Test Steps:**
1. Send POST to /api/orders with auth token
2. Body: { items, deliveryAddress }

**Expected Result:**
- ✅ Status: 201 Created
- ✅ Order created in database
- ✅ Stock updated
- ✅ Points deducted
- ✅ Returns: order, remainingPoints

**Actual Result:** Pass ✅

---

## Test Summary

| Category | Total Tests | Passed | Failed |
|----------|-------------|--------|--------|
| Authentication | 5 | 5 | 0 |
| Points System | 2 | 2 | 0 |
| Product Management | 4 | 4 | 0 |
| Shopping Cart & Orders | 6 | 6 | 0 |
| Stock Management | 3 | 3 | 0 |
| E-Waste Facilities | 4 | 4 | 0 |
| Admin Dashboard | 6 | 6 | 0 |
| Role-Based Access | 2 | 2 | 0 |
| Database Operations | 2 | 2 | 0 |
| API Endpoints | 3 | 3 | 0 |
| **TOTAL** | **37** | **37** | **0** |

**Success Rate: 100%** ✅

---

## How to Run Tests

### Automated Tests
```bash
npm test
```

### Manual Testing
1. Start server: `npm start`
2. Open browser: http://localhost:3000
3. Follow test steps for each test case
4. Verify expected results

---

## Test Environment

- **Node.js:** v14+
- **Database:** MySQL (via XAMPP)
- **Server:** Express.js on port 3000
- **Browser:** Chrome/Firefox (latest)

---

## Notes

- All tests assume clean database state
- Run `node scripts/seedProducts.js` before testing
- Admin credentials: admin@gmail.com / admin@123
- Test user credentials created dynamically
- Stock levels may vary based on previous orders

---

**Last Updated:** November 17, 2025  
**Test Status:** All Passing ✅
