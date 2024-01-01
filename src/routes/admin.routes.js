const express = require('express');
const {dashboard, search} = require('../controllers/adminControllers');
const router = express.Router();

/* admin */
router
  .get('/dashboard', dashboard)
  .get('/search', search)

module.exports = router;