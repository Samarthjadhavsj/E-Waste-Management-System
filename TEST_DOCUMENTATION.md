# Test Documentation

## Overview
The `test.js` file contains a comprehensive test suite for the E-Waste Facility Locator application. It tests all major functionality including authentication, product management, order processing, stock management, and admin APIs.

## Test Coverage

### 🔐 Authentication Tests (3 tests)
1. **User Registration** - Creates a new test user
2. **User Login** - Validates login with credentials
3. **Get User Profile** - Retrieves authenticated user data

### 📦 Product Tests (2 tests)
4. **Get Products** - Fetches all products from database
5. **Stock Calculation** - Validates formula: `Remaining = Initial - Sold`

### 💰 Points System Tests (2 tests)
6. **Claim Device Points** - Tests e-waste recycling points
7. **Get Transactions** - Retrieves transaction history

### 🛒 Order Tests (2 tests)
8. **Create Order** - Places order and validates stock reduction
9. **Get User Orders** - Retrieves user's order history

### 👨‍💼 Admin Tests (3 tests)
10. **Admin Products** - Tests product statistics API
11. **Admin Users** - Tests user statistics API
12. **Admin Orders** - Tests order statistics API

### 🏢 Facilities Test (1 test)
13. **Get Facilities** - Retrieves e-waste collection centers

### 🗄️ Database Test (1 test)
14. **Database Connection** - Validates MySQL connection

### 🧹 Cleanup (1 test)
15. **Cleanup** - Removes test data from database

---

## Running Tests

### Prerequisites
1. **Server must be running:**
   ```bash
   npm start
   ```

2. **Database must be seeded:**
   ```bash
   node scripts/seedProducts.js
   ```

### Run All Tests
```bash
npm test
```

Or directly:
```bash
node test.js
```

---

## Test Output

### Success Example
```
╔════════════════════════════════════════════════════════════╗
║   E-WASTE FACILITY LOCATOR - COMPREHENSIVE TEST SUITE     ║
╚════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 TEST: Database Connection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Connected to MySQL database
ℹ️  Database: ewaste_locator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 TEST: User Registration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ User registered successfully
ℹ️  User ID: 5
ℹ️  Email: test1731835200000@example.com
ℹ️  Token: eyJhbGciOiJIUzI1NiIs...

[... more tests ...]

╔════════════════════════════════════════════════════════════╗
║                      TEST SUMMARY                          ║
╚════════════════════════════════════════════════════════════╝

 1. Database Connection            ✅ PASS
 2. User Registration               ✅ PASS
 3. User Login                      ✅ PASS
 4. Get User Profile                ✅ PASS
 5. Get Products                    ✅ PASS
 6. Claim Device Points             ✅ PASS
 7. Get Transactions                ✅ PASS
 8. Create Order                    ✅ PASS
 9. Get User Orders                 ✅ PASS
10. Admin Products                  ✅ PASS
11. Admin Users                     ✅ PASS
12. Admin Orders                    ✅ PASS
13. Stock Calculation               ✅ PASS
14. Get Facilities                  ✅ PASS
15. Cleanup                         ✅ PASS

Total Tests: 15
Passed: 15
Failed: 0
Success Rate: 100.0%

🎉 ALL TESTS PASSED! 🎉
```

---

## What Each Test Validates

### Test 1: Database Connection
- ✅ MySQL connection successful
- ✅ Correct database selected

### Test 2: User Registration
- ✅ User created in database
- ✅ JWT token generated
- ✅ Password hashed correctly

### Test 3: User Login
- ✅ Credentials validated
- ✅ Token returned
- ✅ User authenticated

### Test 4: Get User Profile
- ✅ Protected route accessible with token
- ✅ User data retrieved correctly
- ✅ Points displayed

### Test 5: Get Products
- ✅ Products fetched from database
- ✅ Stock and sold fields present
- ✅ Price information correct

### Test 6: Claim Device Points
- ✅ Points added to user account
- ✅ Transaction recorded
- ✅ Database updated

### Test 7: Get Transactions
- ✅ Transaction history retrieved
- ✅ Latest transaction shown
- ✅ Points tracked correctly

### Test 8: Create Order
- ✅ Order placed successfully
- ✅ Stock reduced by quantity ordered
- ✅ Sold count increased
- ✅ User points deducted
- ✅ Order status set to "Order Placed"

### Test 9: Get User Orders
- ✅ User's orders retrieved
- ✅ Order details correct
- ✅ Status displayed

### Test 10: Admin Products
- ✅ Product statistics calculated
- ✅ Total stock, sold, value computed
- ✅ Low stock items identified

### Test 11: Admin Users
- ✅ User statistics retrieved
- ✅ Total users and points calculated

### Test 12: Admin Orders
- ✅ Order statistics retrieved
- ✅ Total orders and points spent calculated

### Test 13: Stock Calculation
- ✅ Formula validated: `Remaining = Initial - Sold`
- ✅ All products have correct stock levels

### Test 14: Get Facilities
- ✅ E-waste facilities retrieved
- ✅ Location data present

### Test 15: Cleanup
- ✅ Test data removed
- ✅ Database cleaned

---

## Troubleshooting

### Test Fails: "Connection refused"
**Solution:** Make sure the server is running on port 3000
```bash
npm start
```

### Test Fails: "No products found"
**Solution:** Seed the database first
```bash
node scripts/seedProducts.js
```

### Test Fails: "Insufficient points"
**Solution:** The test creates a new user and claims points before ordering. If this fails, check the claim-device endpoint.

### Test Fails: "Stock calculation mismatch"
**Solution:** Run the stock fix script
```bash
node scripts/fixStockCalculation.js
```

---

## Adding New Tests

To add a new test, follow this pattern:

```javascript
async function testXX_YourTestName() {
    logTest('Your Test Name');
    try {
        // Your test logic here
        
        if (success) {
            logSuccess('Test passed');
            return true;
        } else {
            logError('Test failed');
            return false;
        }
    } catch (error) {
        logError(`Error: ${error.message}`);
        return false;
    }
}
```

Then add it to the `tests` array in `runAllTests()`.

---

## CI/CD Integration

This test suite can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: |
    npm start &
    sleep 5
    npm test
```

---

## Test Data

- **Test User:** Created with unique email (timestamp-based)
- **Test Orders:** Placed and cleaned up automatically
- **Database:** No permanent changes (cleanup runs at end)

---

## Exit Codes

- `0` - All tests passed
- `1` - One or more tests failed

---

## Notes

- Tests run sequentially (not parallel)
- Each test depends on previous tests
- Test user is deleted after completion
- Safe to run multiple times
- No manual cleanup required
