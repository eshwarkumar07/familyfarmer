const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.render('customer'); // Render customer.ejs
});

module.exports = router;
