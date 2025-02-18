const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const trackActivity = require('./middleware/trackActivity');

// Configure environment variables
dotenv.config();

// Create Express app
const app = express();

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const enquiryRoutes = require('./routes/enquiries');
const notificationRoutes = require('./routes/notifications');
const activeUserRoutes = require('./routes/activeUsers');
const visitorRoutes = require('./routes/visitors');
const userStatisticsRoutes = require('./routes/userStatistics');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trackActivity);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crud_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the CRUD API',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders',
      enquiries: '/api/enquiries',
      notifications: '/api/notifications',
      activeUsers: '/api/active-users',
      visitors: '/api/visitors',
      userStatistics: '/api/user-statistics'
    }
  });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/active-users', activeUserRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/user-statistics', userStatisticsRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api`);
});