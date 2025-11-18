@echo off
echo ========================================
echo E-Waste Facility Locator - Quick Start
echo ========================================
echo.
echo STEP 1: Start XAMPP MySQL
echo --------------------------
echo 1. Open XAMPP Control Panel
echo 2. Click "Start" for MySQL
echo 3. Wait for green "Running" status
echo.
pause
echo.
echo STEP 2: Create Database
echo -----------------------
echo Opening phpMyAdmin in browser...
start http://localhost/phpmyadmin
echo.
echo In phpMyAdmin:
echo 1. Click "New" in left sidebar
echo 2. Database name: ewaste_locator
echo 3. Click "Create"
echo.
pause
echo.
echo STEP 3: Starting Server...
echo --------------------------
echo.
npm start
