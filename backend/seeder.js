// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Define the Sweet Schema (must match your model)
const SweetSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
});

const Sweet = mongoose.model('Sweet', SweetSchema);

// Sample data arrays
const names = ['Gummy Bears', 'Chocolate Bar', 'Lollipop', 'Jelly Beans', 'Sour Patch', 'Caramel Chew', 'Muffin', 'Cookie', 'Cupcake', 'Donut'];
const categories = ['Candy', 'Chocolate', 'Pastry', 'Gummy', 'Sour'];

// Function to generate random sweets
const generateSweets = (count) => {
  const sweets = [];
  for (let i = 1; i <= count; i++) {
    sweets.push({
      name: `${names[Math.floor(Math.random() * names.length)]} #${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: parseFloat((Math.random() * 5 + 1).toFixed(2)),
      quantity: Math.floor(Math.random() * 100) + 10,
    });
  }
  return sweets;
};

// Connect to DB and import data
const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear existing sweets to avoid duplicates
    await Sweet.deleteMany();
    console.log('Existing sweets cleared.');

    // Generate and insert 100 new sweets
    const sweetsToInsert = generateSweets(100);
    await Sweet.insertMany(sweetsToInsert);

    console.log('✅ 100 sweets have been imported!');
    process.exit();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

// Run the script
importData();