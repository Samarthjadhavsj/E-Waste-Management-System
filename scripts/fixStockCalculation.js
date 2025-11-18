const { Product } = require('../models');
const sequelize = require('../config/database');

async function fixStockCalculation() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL\n');

    const products = await Product.findAll();
    
    console.log('🔧 Fixing stock calculations...\n');
    console.log('Before:');
    console.log('ID | Product                         | Initial | Stock | Sold | Calculated');
    console.log('---|--------------------------------|---------|-------|------|------------');
    
    for (const product of products) {
      const initial = product.initialStock;
      const currentStock = product.stock;
      const sold = product.sold || 0;
      const calculatedStock = initial - sold;
      
      console.log(`${product.id.toString().padStart(2)} | ${product.name.padEnd(30)} | ${initial.toString().padStart(7)} | ${currentStock.toString().padStart(5)} | ${sold.toString().padStart(4)} | ${calculatedStock.toString().padStart(10)}`);
      
      // Fix the stock to match: initialStock - sold
      if (currentStock !== calculatedStock) {
        product.stock = calculatedStock;
        await product.save();
        console.log(`   ✅ Fixed: ${currentStock} → ${calculatedStock}`);
      }
    }
    
    console.log('\n📦 After Fix:');
    const updatedProducts = await Product.findAll();
    console.log('ID | Product                         | Initial | Stock | Sold | Match?');
    console.log('---|--------------------------------|---------|-------|------|--------');
    
    updatedProducts.forEach(p => {
      const match = (p.initialStock - p.sold === p.stock) ? '✅' : '❌';
      console.log(`${p.id.toString().padStart(2)} | ${p.name.padEnd(30)} | ${p.initialStock.toString().padStart(7)} | ${p.stock.toString().padStart(5)} | ${p.sold.toString().padStart(4)} | ${match}`);
    });
    
    console.log('\n✅ Stock calculations fixed!');
    console.log('💡 Formula: Remaining Stock = Initial Stock - Sold');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixStockCalculation();
