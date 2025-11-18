const { Product } = require('../models');
const sequelize = require('../config/database');

const products = [
  {
    name: 'Bamboo Toothbrush (Pack)',
    price: 120,
    category: 'eco-friendly',
    initialStock: 150,
    stock: 150,
    maxOrder: 10,
    status: 'In Stock'
  },
  {
    name: 'Reusable Tote Bag',
    price: 200,
    category: 'sustainable',
    initialStock: 200,
    stock: 200,
    maxOrder: 10,
    status: 'In Stock'
  },
  {
    name: 'Solar Power Bank',
    price: 1200,
    category: 'solar',
    initialStock: 75,
    stock: 75,
    maxOrder: 10,
    status: 'In Stock'
  },
  {
    name: 'Recycled Notebook',
    price: 80,
    category: 'recycled',
    initialStock: 300,
    stock: 300,
    maxOrder: 10,
    status: 'In Stock'
  },
  {
    name: 'Ecofriendly Photo Frame',
    price: 250,
    category: 'recycled',
    initialStock: 120,
    stock: 120,
    maxOrder: 10,
    status: 'In Stock'
  },
  {
    name: 'Ecofriendly Mobile Holder',
    price: 300,
    category: 'recycled',
    initialStock: 100,
    stock: 100,
    maxOrder: 10,
    status: 'In Stock'
  }
];

async function seedProducts() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL');

    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: true });

    // Clear existing products
    await Product.destroy({ where: {} });

    // Insert products
    await Product.bulkCreate(products);
    console.log('✅ Products seeded successfully!');
    console.log(`📦 ${products.length} products added to database`);
    console.log('\n🎨 Using original eco-friendly images');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
