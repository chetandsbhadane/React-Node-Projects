// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Example route: Get all users
router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
