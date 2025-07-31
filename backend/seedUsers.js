// backend/seedUsers.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/User");

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();

    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashed,
      role: "Admin",
    });

    console.log("✅ Users seeded");
    process.exit();
  } catch (e) {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  }
}

seed();
