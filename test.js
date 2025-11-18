/**
 * E-WASTE FACILITY LOCATOR - COMPREHENSIVE TEST SUITE
 * 
 * This file tests all major functionality of the application:
 * - Database Connection
 * - User Authentication (Register/Login)
 * - Product Management
 * - Order Processing
 * - Stock Management
 * - Points System
 * - Admin APIs
 */

const fetch = require('node-fetch');
const { User, Product, Order, Transaction } = require('./models');
const sequelize = require('./config/database');

// Test Configuration
const API_URL = 'http://localhost:3000/api';
const TEST_USER = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'test123'
};

let authToken = null;
let testUserId = null;
let testProductId = null;

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// Helper Functions
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName) {
    console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.blue}🧪 TEST: ${testName}${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'yellow');
}

// Test Cases
async function test1_DatabaseConnection() {
    logTest('Database Connection');
    try {
        await sequelize.authenticate();
        logSuccess('Connected to MySQL database');
        
        const [results] = await sequelize.query('SELECT DATABASE() as db');
        logInfo(`Database: ${results[0].db}`);
        return true;
    } catch (error) {
        logError(`Database connection failed: ${error.message}`);
        return false;
    }
}

async function test2_UserRegistration() {
    logTest('User Registration');
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_USER)
        });
        
        const data = await response.json();
        
        if (response.ok && data.token) {
            authToken = data.token;
            testUserId = data.user.id;
            logSuccess(`User registered successfully`);
            logInfo(`User ID: ${testUserId}`);
            logInfo(`Email: ${TEST_USER.email}`);
            logInfo(`Token: ${authToken.substring(0, 20)}...`);
            return true;
        } else {
            logError(`Registration failed: ${data.message}`);
            return false;
        }
    } catch (error) {
        logError(`Registration error: ${error.message}`);
        return false;
    }
}

async function test3_UserLogin() {
    logTest('User Login');
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: TEST_USER.email,
                password: TEST_USER.password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.token) {
            logSuccess('Login successful');
            logInfo(`Token matches: ${data.token === authToken}`);
            return true;
        } else {
            logError(`Login failed: ${data.message}`);
            return false;
        }
    } catch (error) {
        logError(`Login error: ${error.message}`);
        return false;
    }
}

async function test4_GetUserProfile() {
    logTest('Get User Profile');
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const user = await response.json();
        
        if (response.ok) {
            logSuccess('User profile retrieved');
            logInfo(`Name: ${user.name}`);
            logInfo(`Email: ${user.email}`);
            logInfo(`Points: ${user.points}`);
            return true;
        } else {
            logError('Failed to get user profile');
            return false;
        }
    } catch (error) {
        logError(`Profile error: ${error.message}`);
        return false;
    }
}

async function test5_GetProducts() {
    logTest('Get Products');
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        
        if (response.ok && products.length > 0) {
            testProductId = products[0].id;
            logSuccess(`Retrieved ${products.length} products`);
            logInfo(`First product: ${products[0].name} (${products[0].price} pts)`);
            logInfo(`Stock: ${products[0].stock}, Sold: ${products[0].sold || 0}`);
            return true;
        } else {
            logError('No products found');
            return false;
        }
    } catch (error) {
        logError(`Products error: ${error.message}`);
        return false;
    }
}

async function test6_ClaimDevicePoints() {
    logTest('Claim Device Points');
    try {
        // Claim points twice to have enough for order
        const response1 = await fetch(`${API_URL}/users/claim-device`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                device: 'smartphone',
                points: 75
            })
        });
        
        const response2 = await fetch(`${API_URL}/users/claim-device`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                device: 'laptop',
                points: 100
            })
        });
        
        const data = await response2.json();
        
        if (response1.ok && response2.ok) {
            logSuccess('Device points claimed (2 devices)');
            logInfo(`Devices: smartphone + laptop`);
            logInfo(`Points earned: 175 total`);
            logInfo(`Total points: ${data.points}`);
            return true;
        } else {
            logError(`Claim failed`);
            return false;
        }
    } catch (error) {
        logError(`Claim error: ${error.message}`);
        return false;
    }
}

async function test7_GetTransactions() {
    logTest('Get Transaction History');
    try {
        const response = await fetch(`${API_URL}/users/transactions`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const transactions = await response.json();
        
        if (response.ok) {
            logSuccess(`Retrieved ${transactions.length} transactions`);
            if (transactions.length > 0) {
                logInfo(`Latest: ${transactions[0].action} - ${transactions[0].points} pts`);
            }
            return true;
        } else {
            logError('Failed to get transactions');
            return false;
        }
    } catch (error) {
        logError(`Transactions error: ${error.message}`);
        return false;
    }
}

async function test8_CreateOrder() {
    logTest('Create Order (Stock Management)');
    try {
        // Get product before order
        const productBefore = await Product.findByPk(testProductId);
        const stockBefore = productBefore.stock;
        const soldBefore = productBefore.sold || 0;
        
        logInfo(`Before order - Stock: ${stockBefore}, Sold: ${soldBefore}`);
        
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                items: [{ productId: testProductId, quantity: 1 }],
                deliveryAddress: 'Test Address, Test City, 123456'
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            logSuccess('Order created successfully');
            logInfo(`Order ID: ${data.order.id}`);
            logInfo(`Total Points: ${data.totalPoints}`);
            logInfo(`Remaining Points: ${data.remainingPoints}`);
            
            // Verify stock updated
            const productAfter = await Product.findByPk(testProductId);
            const stockAfter = productAfter.stock;
            const soldAfter = productAfter.sold || 0;
            
            logInfo(`After order - Stock: ${stockAfter}, Sold: ${soldAfter}`);
            
            if (stockAfter === stockBefore - 1 && soldAfter === soldBefore + 1) {
                logSuccess('Stock and sold count updated correctly');
                return true;
            } else {
                logError('Stock/sold count mismatch');
                return false;
            }
        } else {
            logError(`Order failed: ${data.message}`);
            return false;
        }
    } catch (error) {
        logError(`Order error: ${error.message}`);
        return false;
    }
}

async function test9_GetUserOrders() {
    logTest('Get User Orders');
    try {
        const response = await fetch(`${API_URL}/orders/my-orders`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const orders = await response.json();
        
        if (response.ok) {
            logSuccess(`Retrieved ${orders.length} orders`);
            if (orders.length > 0) {
                logInfo(`Latest order status: ${orders[0].status}`);
                logInfo(`Items: ${orders[0].items.length}`);
            }
            return true;
        } else {
            logError('Failed to get orders');
            return false;
        }
    } catch (error) {
        logError(`Orders error: ${error.message}`);
        return false;
    }
}

async function test10_AdminProducts() {
    logTest('Admin - Get Products Stats');
    try {
        const response = await fetch(`${API_URL}/admin/products`);
        const data = await response.json();
        
        if (response.ok) {
            logSuccess('Admin products retrieved');
            logInfo(`Total Products: ${data.stats.totalProducts}`);
            logInfo(`Total Stock: ${data.stats.totalStock}`);
            logInfo(`Total Sold: ${data.stats.totalSold}`);
            logInfo(`Low Stock Items: ${data.stats.lowStock}`);
            logInfo(`Total Value: ${data.stats.totalValue} pts`);
            return true;
        } else {
            logError('Failed to get admin products');
            return false;
        }
    } catch (error) {
        logError(`Admin products error: ${error.message}`);
        return false;
    }
}

async function test11_AdminUsers() {
    logTest('Admin - Get Users Stats');
    try {
        const response = await fetch(`${API_URL}/admin/users`);
        const data = await response.json();
        
        if (response.ok) {
            logSuccess('Admin users retrieved');
            logInfo(`Total Users: ${data.stats.totalUsers}`);
            logInfo(`Total Points: ${data.stats.totalPoints}`);
            return true;
        } else {
            logError('Failed to get admin users');
            return false;
        }
    } catch (error) {
        logError(`Admin users error: ${error.message}`);
        return false;
    }
}

async function test12_AdminOrders() {
    logTest('Admin - Get Orders Stats');
    try {
        const response = await fetch(`${API_URL}/admin/orders`);
        const data = await response.json();
        
        if (response.ok) {
            logSuccess('Admin orders retrieved');
            logInfo(`Total Orders: ${data.stats.totalOrders}`);
            logInfo(`Total Points Spent: ${data.stats.totalPointsSpent}`);
            return true;
        } else {
            logError('Failed to get admin orders');
            return false;
        }
    } catch (error) {
        logError(`Admin orders error: ${error.message}`);
        return false;
    }
}

async function test13_StockCalculation() {
    logTest('Stock Calculation Validation');
    try {
        const products = await Product.findAll();
        let allValid = true;
        
        for (const product of products) {
            const expected = product.initialStock - (product.sold || 0);
            const actual = product.stock;
            
            if (expected === actual) {
                logSuccess(`${product.name}: ${product.initialStock} - ${product.sold || 0} = ${actual} ✓`);
            } else {
                logError(`${product.name}: Expected ${expected}, Got ${actual} ✗`);
                allValid = false;
            }
        }
        
        return allValid;
    } catch (error) {
        logError(`Stock validation error: ${error.message}`);
        return false;
    }
}

async function test14_GetFacilities() {
    logTest('Get E-Waste Facilities');
    try {
        const response = await fetch(`${API_URL}/facilities`);
        const facilities = await response.json();
        
        if (response.ok && facilities.length > 0) {
            logSuccess(`Retrieved ${facilities.length} facilities`);
            logInfo(`First facility: ${facilities[0].name}`);
            logInfo(`Location: ${facilities[0].address}`);
            return true;
        } else {
            logError('No facilities found');
            return false;
        }
    } catch (error) {
        logError(`Facilities error: ${error.message}`);
        return false;
    }
}

async function test15_Cleanup() {
    logTest('Cleanup Test Data');
    try {
        // Delete test user and related data
        await Transaction.destroy({ where: { userId: testUserId } });
        await Order.destroy({ where: { userId: testUserId } });
        await User.destroy({ where: { id: testUserId } });
        
        logSuccess('Test data cleaned up');
        logInfo(`Deleted user: ${TEST_USER.email}`);
        return true;
    } catch (error) {
        logError(`Cleanup error: ${error.message}`);
        return false;
    }
}

// Main Test Runner
async function runAllTests() {
    console.log('\n');
    log('╔════════════════════════════════════════════════════════════╗', 'cyan');
    log('║   E-WASTE FACILITY LOCATOR - COMPREHENSIVE TEST SUITE     ║', 'cyan');
    log('╚════════════════════════════════════════════════════════════╝', 'cyan');
    console.log('\n');
    
    const tests = [
        { name: 'Database Connection', fn: test1_DatabaseConnection },
        { name: 'User Registration', fn: test2_UserRegistration },
        { name: 'User Login', fn: test3_UserLogin },
        { name: 'Get User Profile', fn: test4_GetUserProfile },
        { name: 'Get Products', fn: test5_GetProducts },
        { name: 'Claim Device Points', fn: test6_ClaimDevicePoints },
        { name: 'Get Transactions', fn: test7_GetTransactions },
        { name: 'Create Order', fn: test8_CreateOrder },
        { name: 'Get User Orders', fn: test9_GetUserOrders },
        { name: 'Admin Products', fn: test10_AdminProducts },
        { name: 'Admin Users', fn: test11_AdminUsers },
        { name: 'Admin Orders', fn: test12_AdminOrders },
        { name: 'Stock Calculation', fn: test13_StockCalculation },
        { name: 'Get Facilities', fn: test14_GetFacilities },
        { name: 'Cleanup', fn: test15_Cleanup }
    ];
    
    let passed = 0;
    let failed = 0;
    const results = [];
    
    for (const test of tests) {
        try {
            const result = await test.fn();
            if (result) {
                passed++;
                results.push({ name: test.name, status: 'PASS' });
            } else {
                failed++;
                results.push({ name: test.name, status: 'FAIL' });
            }
        } catch (error) {
            failed++;
            results.push({ name: test.name, status: 'ERROR' });
            logError(`Unexpected error: ${error.message}`);
        }
    }
    
    // Summary
    console.log('\n');
    log('╔════════════════════════════════════════════════════════════╗', 'cyan');
    log('║                      TEST SUMMARY                          ║', 'cyan');
    log('╚════════════════════════════════════════════════════════════╝', 'cyan');
    console.log('\n');
    
    results.forEach((result, index) => {
        const status = result.status === 'PASS' 
            ? `${colors.green}✅ PASS${colors.reset}` 
            : `${colors.red}❌ FAIL${colors.reset}`;
        console.log(`${(index + 1).toString().padStart(2)}. ${result.name.padEnd(30)} ${status}`);
    });
    
    console.log('\n');
    log(`Total Tests: ${tests.length}`, 'blue');
    log(`Passed: ${passed}`, 'green');
    log(`Failed: ${failed}`, 'red');
    log(`Success Rate: ${((passed / tests.length) * 100).toFixed(1)}%`, 'yellow');
    console.log('\n');
    
    if (failed === 0) {
        log('🎉 ALL TESTS PASSED! 🎉', 'green');
    } else {
        log('⚠️  SOME TESTS FAILED', 'red');
    }
    
    console.log('\n');
    process.exit(failed === 0 ? 0 : 1);
}

// Run tests
if (require.main === module) {
    runAllTests().catch(error => {
        logError(`Fatal error: ${error.message}`);
        console.error(error);
        process.exit(1);
    });
}

module.exports = { runAllTests };
