const express = require('express');
const {dashboard} = require('../controllers/adminControllers');
const router = express.Router();

/* admin */
router
  .get('/dashboard', dashboard)

module.exports = router;