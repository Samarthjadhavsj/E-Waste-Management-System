const { User } = require('../models');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

async function createCustomAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL\n');

    // Sync database
    await sequelize.sync({ alter: true });
    console.log('✅ Database schema updated\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@gmail.com' } });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists, updating...');
      
      // Update password and role (password will be auto-hashed by model hook)
      existingAdmin.password = 'admin@123';
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      
      console.log('✅ Admin user updated successfully!\n');
    } else {
      // Create new admin user (password will be auto-hashed by model hook)
      await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin@123',
        points: 0,
        role: 'admin'
      });

      console.log('✅ Admin user created successfully!\n');
    }

    console.log('🔐 Admin Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@gmail.com');
    console.log('🔑 Password: admin@123');
    console.log('👤 Role:     admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Show all users
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'points']
    });

    console.log('👥 All Users:\n');
    console.log('ID | Name                | Email                        | Role  | Points');
    console.log('---|---------------------|------------------------------|-------|-------');
    
    users.forEach(u => {
      const id = u.id.toString().padStart(2);
      const name = u.name.padEnd(19);
      const email = u.email.padEnd(28);
      const role = u.role.padEnd(5);
      const points = u.points.toString().padStart(5);
      console.log(`${id} | ${name} | ${email} | ${role} | ${points}`);
    });

    console.log('\n✅ Setup complete!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createCustomAdmin();
