const mongoose = require('mongoose');
const Users = require('./models/User');
const Visitors = require('./models/Visitor');
const Enquiries = require('./models/Enquiry');
const ActiveUsers = require('./models/ActiveUser');
const Orders = require('./models/Order');
const Products = require('./models/Product');
const UserStatistics = require('./models/UserStatistics');
const Notifications = require('./models/Notification');
require('dotenv').config();

// Mock data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    profile_image: 'https://example.com/admin.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'customer',
    profile_image: 'https://example.com/john.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  }
];

const visitors = [
  {
    ip_address: '192.168.1.1',
    location: {
      country: 'United States',
      city: 'New York',
      latitude: 40.7128,
      longitude: -74.0060
    },
    visit_count: 5,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.2',
    location: {
      country: 'India',
      city: 'Mumbai',
      latitude: 19.0760,
      longitude: 72.8777
    },
    visit_count: 3,
    last_visited_at: new Date(),
    is_deleted: false
  }
];

const products = [
  {
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    stock_quantity: 50,
    image_url: 'https://example.com/laptop.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    price: 799.99,
    stock_quantity: 100,
    image_url: 'https://example.com/phone.jpg',
    is_active: true,
    is_deleted: false
  }
];

// Function to create related data after users and products are created
const createRelatedData = async (users, products) => {
  // Create enquiries
  const enquiries = [
    {
      user_id: users[0]._id,
      message: 'Need help with my order',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[1]._id,
      message: 'Product inquiry',
      status: 'closed',
      is_deleted: false
    }
  ];

  // Create active users
  const activeUsers = [
    {
      user_id: users[0]._id,
      session_duration: 3600,
      is_deleted: false,
      Location: '40.7128,-74.0060'
    },
    {
      user_id: users[1]._id,
      session_duration: 1800,
      is_deleted: false,
      Location: '19.0760,72.8777'
    }
  ];

  // Create orders
  const orders = [
    {
      user_id: users[0]._id,
      order_number: 'ORD-001',
      products: [
        {
          product_id: products[0]._id,
          quantity: 1,
          price: products[0].price
        }
      ],
      total_amount: products[0].price,
      status: 'pending',
      is_deleted: false
    },
    {
      user_id: users[1]._id,
      order_number: 'ORD-002',
      products: [
        {
          product_id: products[1]._id,
          quantity: 2,
          price: products[1].price
        }
      ],
      total_amount: products[1].price * 2,
      status: 'shipped',
      is_deleted: false
    }
  ];

  // Create user statistics
  const userStatistics = [
    {
      user_id: users[0]._id,
      pages_visited: [
        {
          page_name: 'home',
          visit_count: 10
        },
        {
          page_name: 'products',
          visit_count: 5
        }
      ],
      total_time_spent: 7200,
      is_deleted: false
    },
    {
      user_id: users[1]._id,
      pages_visited: [
        {
          page_name: 'home',
          visit_count: 8
        },
        {
          page_name: 'cart',
          visit_count: 3
        }
      ],
      total_time_spent: 3600,
      is_deleted: false
    }
  ];

  // Create notifications
  const notifications = [
    {
      user_id: users[0]._id,
      message: 'Your order has been shipped',
      is_read: false,
      is_deleted: false
    },
    {
      user_id: users[1]._id,
      message: 'New product available',
      is_read: true,
      is_deleted: false
    }
  ];

  await Enquiries.insertMany(enquiries);
  await ActiveUsers.insertMany(activeUsers);
  await Orders.insertMany(orders);
  await UserStatistics.insertMany(userStatistics);
  await Notifications.insertMany(notifications);

  console.log('Related data seeded successfully');
};

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swansorterAdmin_db')
  .then(async () => {
    try {
      // Clear existing data
      await Users.deleteMany({});
      await Visitors.deleteMany({});
      await Products.deleteMany({});
      await Enquiries.deleteMany({});
      await ActiveUsers.deleteMany({});
      await Orders.deleteMany({});
      await UserStatistics.deleteMany({});
      await Notifications.deleteMany({});

      // Seed new data
      const createdUsers = await Users.insertMany(users);
      const createdProducts = await Products.insertMany(products);
      await Visitors.insertMany(visitors);
      await createRelatedData(createdUsers, createdProducts);

      console.log('Database seeded successfully');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
