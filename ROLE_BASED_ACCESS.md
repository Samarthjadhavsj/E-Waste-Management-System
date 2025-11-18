# Role-Based Access Control

## Overview
The application now has role-based access control with two user types:
- **User** - Regular customers (default)
- **Admin** - Administrators with dashboard access

---

## User Roles

### 👤 Regular User (role: 'user')
**Access:**
- ✅ Main application (index.html / main.html)
- ✅ Home page
- ✅ E-Dump section (map, device estimator)
- ✅ Store section (browse products, purchase)
- ✅ Account section (points, transactions)
- ❌ Admin dashboard (redirected to main app)

**Features:**
- Register and login
- Claim points by recycling devices
- Browse and purchase products
- View transaction history
- Track orders

---

### 👨‍💼 Admin (role: 'admin')
**Access:**
- ✅ Admin dashboard (admin.html)
- ❌ Main application sections (redirected to admin dashboard)

**Features:**
- View product inventory
- Monitor stock levels
- Track sold items
- View user statistics
- Monitor orders
- Real-time dashboard updates

---

## Login Behavior

### User Login
1. User enters credentials
2. System checks role
3. If role = 'user' → Stay on main app
4. If role = 'admin' → Redirect to admin dashboard

### Admin Login
1. Admin enters credentials
2. System checks role
3. Automatically redirected to admin dashboard
4. Cannot access main app sections

---

## Admin Account

**Default Admin Credentials:**
```
Email: admin@ewaste.com
Password: admin123
```

⚠️ **Important:** Change the default password after first login!

---

## Creating Admin Users

### Method 1: Using Script
```bash
node scripts/createAdmin.js
```

This will:
- Add 'role' column to users table
- Create default admin account
- Show all users with their roles

### Method 2: Manual Database Update
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

---

## Access Protection

### Frontend Protection
- Login redirects based on role
- Admin dashboard checks role on page load
- Non-admin users redirected to main app

### Backend Protection (Future Enhancement)
Add middleware to protect admin routes:
```javascript
// middleware/adminAuth.js
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
```

---

## User Management

### Current Users
Run this to see all users and their roles:
```bash
node scripts/createAdmin.js
```

Output example:
```
ID | Name      | Email              | Role  | Points
---|-----------|--------------------| ------|-------
 1 | sam       | sam@gmail.com      | user  |   273
 2 | smokey    | smokey@gmail.com   | user  |   120
 6 | Admin     | admin@ewaste.com   | admin |     0
```

---

## Testing

### Test User Login
1. Go to http://localhost:3000
2. Click "Login / Register"
3. Login with any user account
4. Should stay on main application

### Test Admin Login
1. Go to http://localhost:3000
2. Click "Login / Register"
3. Login with admin credentials:
   - Email: admin@ewaste.com
   - Password: admin123
4. Should redirect to admin dashboard

---

## Security Notes

1. **Password Security**
   - All passwords are hashed with bcrypt
   - Never store plain text passwords

2. **Token Security**
   - JWT tokens include user ID only
   - Role is fetched from database on each request

3. **Frontend Protection**
   - Role check on page load
   - Automatic redirection

4. **Recommended Enhancements**
   - Add backend route protection
   - Implement password change feature
   - Add admin user management UI
   - Add role-based permissions (view, edit, delete)

---

## Troubleshooting

### "Access Denied" on Admin Dashboard
**Solution:** Make sure you're logged in as admin
```bash
# Check your role in database
node scripts/createAdmin.js
```

### User Can't Access Main App
**Solution:** Check if user role is set to 'user' (not 'admin')

### Role Column Missing
**Solution:** Run the admin creation script
```bash
node scripts/createAdmin.js
```

---

## Future Enhancements

1. **Multiple Admin Levels**
   - Super Admin
   - Admin
   - Moderator

2. **Permissions System**
   - View only
   - Edit products
   - Manage users
   - Full access

3. **Admin Management UI**
   - Create/edit/delete users
   - Assign roles
   - View activity logs

---

## Summary

✅ Role-based access implemented
✅ Admin dashboard protected
✅ Automatic redirection based on role
✅ Default admin account created
✅ User and admin separation complete

The system now properly separates user and admin access!
