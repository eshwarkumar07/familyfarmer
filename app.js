const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config(); // For loading environment variables

// Import route modules
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const customerRoutes = require('./routes/customer');

const app = express();

// Middleware for JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use environment variable or fallback
  resave: false,
  saveUninitialized: true,
}));

// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use route modules
app.use('/admin', adminRoutes);
app.use('/employees', employeeRoutes);
app.use('/customers', customerRoutes);

// Serve static files from "public" directory (if you have one)
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
