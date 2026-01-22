const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load env vars from .env.local
try {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && !process.env[key.trim()]) {
        let val = value.trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key.trim()] = val;
      }
    });
    console.log('Loaded .env.local');
  }
} catch (e) {
  console.log('Could not load .env.local', e.message);
}

async function initializeDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const dbName = process.env.MONGODB_DB || 'webbuddies';

  console.log(`Debug: MONGODB_DB=${process.env.MONGODB_DB}`);
  console.log(`Debug: Using DB name: ${dbName}`);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Create admin user
    const adminUsers = db.collection('admin_users');

    // Remove old admin user if exists
    await adminUsers.deleteMany({ email: { $in: ['admin@webbuddies.com', 'patelbanty1260@gmail.com'] } });

    // Create new admin user with correct credentials
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    await adminUsers.insertOne({
      email: 'patelbanty1260@gmail.com',
      password: hashedPassword,
      name: 'Banty Patel',
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('✅ Admin user created with email: patelbanty1260@gmail.com');

    // Create sample project
    const projects = db.collection('projects');
    const existingProject = await projects.findOne({ slug: 'sample-project' });

    if (!existingProject) {
      await projects.insertOne({
        title: 'Sample E-commerce Platform',
        description: 'Modern e-commerce platform built with MERN stack',
        longDescription: 'A comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        images: ['/placeholder-project.jpg'],
        category: 'mern-stack',
        featured: true,
        status: 'completed',
        clientName: 'Sample Client',
        slug: 'sample-project',
        seoTitle: 'Sample E-commerce Platform - MERN Stack Development',
        seoDescription: 'Modern e-commerce platform built with MERN stack featuring user authentication and payment integration.',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ Sample project created');
    } else {
      console.log('✅ Sample project already exists');
    }

    console.log('🎉 Database initialization completed!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  } finally {
    await client.close();
  }
}

initializeDatabase();