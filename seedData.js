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
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    password: 'sarah123',
    role: 'customer',
    profile_image: 'https://example.com/sarah.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Mike Wilson',
    email: 'mike.w@example.com',
    password: 'mike123',
    role: 'customer',
    profile_image: 'https://example.com/mike.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    password: 'emily123',
    role: 'customer',
    profile_image: 'https://example.com/emily.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'David Lee',
    email: 'david.l@example.com',
    password: 'david123',
    role: 'customer',
    profile_image: 'https://example.com/david.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Lisa Chen',
    email: 'lisa.c@example.com',
    password: 'lisa123',
    role: 'customer',
    profile_image: 'https://example.com/lisa.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Tom Anderson',
    email: 'tom.a@example.com',
    password: 'tom123',
    role: 'customer',
    profile_image: 'https://example.com/tom.jpg',
    is_active: false,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Rachel Green',
    email: 'rachel.g@example.com',
    password: 'rachel123',
    role: 'customer',
    profile_image: 'https://example.com/rachel.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Kevin Patel',
    email: 'kevin.p@example.com',
    password: 'kevin123',
    role: 'customer',
    profile_image: 'https://example.com/kevin.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Anna Smith',
    email: 'anna.s@example.com',
    password: 'anna123',
    role: 'customer',
    profile_image: 'https://example.com/anna.jpg',
    is_active: true,
    is_deleted: false,
    created_by: 'system',
    updated_by: 'system'
  },
  {
    name: 'Chris Morgan',
    email: 'chris.m@example.com',
    password: 'chris123',
    role: 'customer',
    profile_image: 'https://example.com/chris.jpg',
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
    ip_address: '192.168.1.3',
    location: {
      country: 'Canada',
      city: 'Toronto',
      latitude: 43.6532,
      longitude: -79.3832
    },
    visit_count: 8,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.4',
    location: {
      country: 'United Kingdom',
      city: 'London',
      latitude: 51.5074,
      longitude: -0.1278
    },
    visit_count: 12,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.5',
    location: {
      country: 'Australia',
      city: 'Sydney',
      latitude: -33.8688,
      longitude: 151.2093
    },
    visit_count: 4,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.6',
    location: {
      country: 'Japan',
      city: 'Tokyo',
      latitude: 35.6762,
      longitude: 139.6503
    },
    visit_count: 6,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.7',
    location: {
      country: 'Germany',
      city: 'Berlin',
      latitude: 52.5200,
      longitude: 13.4050
    },
    visit_count: 9,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.8',
    location: {
      country: 'Brazil',
      city: 'São Paulo',
      latitude: -23.5505,
      longitude: -46.6333
    },
    visit_count: 3,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.9',
    location: {
      country: 'France',
      city: 'Paris',
      latitude: 48.8566,
      longitude: 2.3522
    },
    visit_count: 7,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.10',
    location: {
      country: 'Singapore',
      city: 'Singapore',
      latitude: 1.3521,
      longitude: 103.8198
    },
    visit_count: 5,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.11',
    location: {
      country: 'Spain',
      city: 'Madrid',
      latitude: 40.4168,
      longitude: -3.7038
    },
    visit_count: 4,
    last_visited_at: new Date(),
    is_deleted: false
  },
  {
    ip_address: '192.168.1.12',
    location: {
      country: 'Italy',
      city: 'Rome',
      latitude: 41.9028,
      longitude: 12.4964
    },
    visit_count: 6,
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
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones',
    price: 249.99,
    stock_quantity: 75,
    image_url: 'https://example.com/headphones.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    price: 199.99,
    stock_quantity: 60,
    image_url: 'https://example.com/smartwatch.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Tablet Pro',
    description: '10-inch tablet with stylus support',
    price: 499.99,
    stock_quantity: 40,
    image_url: 'https://example.com/tablet.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Gaming Console',
    description: 'Next-gen gaming console with 4K support',
    price: 499.99,
    stock_quantity: 30,
    image_url: 'https://example.com/console.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with charging case',
    price: 159.99,
    stock_quantity: 90,
    image_url: 'https://example.com/earbuds.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Desktop Computer',
    description: 'High-performance desktop PC for gaming',
    price: 1499.99,
    stock_quantity: 25,
    image_url: 'https://example.com/desktop.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Camera Kit',
    description: 'Professional DSLR camera with lens kit',
    price: 899.99,
    stock_quantity: 20,
    image_url: 'https://example.com/camera.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Smart Speaker',
    description: 'Voice-controlled smart home speaker',
    price: 99.99,
    stock_quantity: 100,
    image_url: 'https://example.com/speaker.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'Router Pro',
    description: 'High-speed WiFi 6 router',
    price: 299.99,
    stock_quantity: 45,
    image_url: 'https://example.com/router.jpg',
    is_active: true,
    is_deleted: false
  },
  {
    name: 'External SSD',
    description: '1TB portable solid-state drive',
    price: 179.99,
    stock_quantity: 80,
    image_url: 'https://example.com/ssd.jpg',
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
      user_id: users[2]._id,
      message: 'Question about return policy',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[3]._id,
      message: 'Shipping delay inquiry',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[4]._id,
      message: 'Product compatibility question',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[5]._id,
      message: 'Warranty information request',
      status: 'closed',
      is_deleted: false
    },
    {
      user_id: users[6]._id,
      message: 'Technical support needed',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[7]._id,
      message: 'Bulk order inquiry',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[8]._id,
      message: 'Payment issue',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[9]._id,
      message: 'Product recommendation request',
      status: 'closed',
      is_deleted: false
    },
    {
      user_id: users[0]._id,
      message: 'Missing parts inquiry',
      status: 'open',
      is_deleted: false
    },
    {
      user_id: users[1]._id,
      message: 'Installation help needed',
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
      user_id: users[2]._id,
      session_duration: 2400,
      is_deleted: false,
      Location: '43.6532,-79.3832'
    },
    {
      user_id: users[3]._id,
      session_duration: 1200,
      is_deleted: false,
      Location: '51.5074,-0.1278'
    },
    {
      user_id: users[4]._id,
      session_duration: 3000,
      is_deleted: false,
      Location: '-33.8688,151.2093'
    },
    {
      user_id: users[5]._id,
      session_duration: 900,
      is_deleted: false,
      Location: '35.6762,139.6503'
    },
    {
      user_id: users[6]._id,
      session_duration: 4200,
      is_deleted: false,
      Location: '52.5200,13.4050'
    },
    {
      user_id: users[7]._id,
      session_duration: 1500,
      is_deleted: false,
      Location: '-23.5505,-46.6333'
    },
    {
      user_id: users[8]._id,
      session_duration: 2700,
      is_deleted: false,
      Location: '48.8566,2.3522'
    },
    {
      user_id: users[9]._id,
      session_duration: 3600,
      is_deleted: false,
      Location: '1.3521,103.8198'
    },
    {
      user_id: users[0]._id,
      session_duration: 1800,
      is_deleted: false,
      Location: '40.4168,-3.7038'
    },
    {
      user_id: users[1]._id,
      session_duration: 2100,
      is_deleted: false,
      Location: '41.9028,12.4964'
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
    },
    {
      user_id: users[2]._id,
      order_number: 'ORD-003',
      products: [
        {
          product_id: products[2]._id,
          quantity: 1,
          price: products[2].price
        }
      ],
      total_amount: products[2].price,
      status: 'delivered',
      is_deleted: false
    },
    {
      user_id: users[3]._id,
      order_number: 'ORD-004',
      products: [
        {
          product_id: products[3]._id,
          quantity: 1,
          price: products[3].price
        }
      ],
      total_amount: products[3].price,
      status: 'pending',
      is_deleted: false
    },
    {
      user_id: users[4]._id,
      order_number: 'ORD-005',
      products: [
        {
          product_id: products[4]._id,
          quantity: 2,
          price: products[4].price
        }
      ],
      total_amount: products[4].price * 2,
      status: 'shipped',
      is_deleted: false
    },
    {
      user_id: users[5]._id,
      order_number: 'ORD-006',
      products: [
        {
          product_id: products[5]._id,
          quantity: 1,
          price: products[5].price
        }
      ],
      total_amount: products[5].price,
      status: 'pending',
      is_deleted: false
    },
    {
      user_id: users[6]._id,
      order_number: 'ORD-007',
      products: [
        {
          product_id: products[6]._id,
          quantity: 1,
          price: products[6].price
        }
      ],
      total_amount: products[6].price,
      status: 'pending',
      is_deleted: false
    },
    {
      user_id: users[7]._id,
      order_number: 'ORD-008',
      products: [
        {
          product_id: products[7]._id,
          quantity: 3,
          price: products[7].price
        }
      ],
      total_amount: products[7].price * 3,
      status: 'delivered',
      is_deleted: false
    },
    {
      user_id: users[8]._id,
      order_number: 'ORD-009',
      products: [
        {
          product_id: products[8]._id,
          quantity: 1,
          price: products[8].price
        }
      ],
      total_amount: products[8].price,
      status: 'pending',
      is_deleted: false
    },
    {
      user_id: users[9]._id,
      order_number: 'ORD-010',
      products: [
        {
          product_id: products[9]._id,
          quantity: 2,
          price: products[9].price
        }
      ],
      total_amount: products[9].price * 2,
      status: 'shipped',
      is_deleted: false
    },
    {
      user_id: users[0]._id,
      order_number: 'ORD-011',
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
      order_number: 'ORD-012',
      products: [
        {
          product_id: products[1]._id,
          quantity: 1,
          price: products[1].price
        }
      ],
      total_amount: products[1].price,
      status: 'delivered',
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
      user_id: users[2]._id,
      pages_visited: [
        {
          page_name: 'products',
          visit_count: 15
        },
        {
          page_name: 'about',
          visit_count: 3
        }
      ],
      total_time_spent: 5400,
      is_deleted: false
    },
    {
      user_id: users[3]._id,
      pages_visited: [
        {
          page_name: 'home',
          visit_count: 12
        },
        {
          page_name: 'support',
          visit_count: 6
        }
      ],
      total_time_spent: 4800,
      is_deleted: false
    },
    {
      user_id: users[4]._id,
      pages_visited: [
        {
          page_name: 'products',
          visit_count: 20
        },
        {
          page_name: 'cart',
          visit_count: 8
        }
      ],
      total_time_spent: 6300,
      is_deleted: false
    },
    {
      user_id: users[5]._id,
      pages_visited: [
        {
          page_name: 'home',
          visit_count: 7
        },
        {
          page_name: 'contact',
          visit_count: 2
        }
      ],
      total_time_spent: 2700,
      is_deleted: false
    },
    {
      user_id: users[6]._id,
      pages_visited: [
        {
          page_name: 'products',
          visit_count: 25
        },
        {
          page_name: 'checkout',
          visit_count: 4
        }
      ],
      total_time_spent: 8100,
      is_deleted: false
    },
    {
      user_id: users[7]._id,
      pages_visited: [
        {
          page_name: 'home',
          visit_count: 9
        },
        {
          page_name: 'blog',
          visit_count: 5
        }
      ],
      total_time_spent: 3900,
      is_deleted: false
    },
    {
      user_id: users[8]._id,
      pages_visited: [
        {
          page_name: 'products',
          visit_count: 18
        },
        {
          page_name: 'faq',
          visit_count: 3
        }
      ],
      total_time_spent: 5100,
      is_deleted: false
    },
    {
      user_id: users[9]._id,
      pages_visited: [
        {
          page_name: 'home',
          visit_count: 11
        },
        {
          page_name: 'orders',
          visit_count: 7
        }
      ],
      total_time_spent: 4200,
      is_deleted: false
    },
    {
      user_id: users[0]._id,
      pages_visited: [
        {
          page_name: 'products',
          visit_count: 22
        },
        {
          page_name: 'profile',
          visit_count: 4
        }
      ],
      total_time_spent: 6900,
      is_deleted: false
    },
    {
      user_id: users[1]._id,
      pages_visited: [
        {
          page_name: 'home',
          visit_count: 13
        },
        {
          page_name: 'wishlist',
          visit_count: 6
        }
      ],
      total_time_spent: 4500,
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
      user_id: users[2]._id,
      message: 'Special offer available on your wishlist items',
      is_read: false,
      is_deleted: false
    },
    {
      user_id: users[3]._id,
      message: 'Your order has been delivered',
      is_read: true,
      is_deleted: false
    },
    {
      user_id: users[4]._id,
      message: 'Price drop on items in your cart',
      is_read: false,
      is_deleted: false
    },
    {
      user_id: users[5]._id,
      message: 'Review your recent purchase',
      is_read: true,
      is_deleted: false
    },
    {
      user_id: users[6]._id,
      message: 'New products in your favorite category',
      is_read: false,
      is_deleted: false
    },
    {
      user_id: users[7]._id,
      message: 'Limited time offer ending soon',
      is_read: true,
      is_deleted: false
    },
    {
      user_id: users[8]._id,
      message: 'Your support ticket has been updated',
      is_read: false,
      is_deleted: false
    },
    {
      user_id: users[9]._id,
      message: 'Weekend sale starting now',
      is_read: true,
      is_deleted: false
    },
    {
      user_id: users[0]._id,
      message: 'Your order is out for delivery',
      is_read: false,
      is_deleted: false
    },
    {
      user_id: users[1]._id,
      message: 'Thank you for your recent purchase',
      is_read: true,
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
