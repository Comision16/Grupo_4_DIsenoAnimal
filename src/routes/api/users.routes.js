const express = require('express');
const { listUser, oneUser } = require('../../controllers/api/UsersController');

const router = express.Router();

/* GET users listing. */
router
  .get('/users', listUser)
  .get('/users/:id', oneUser )
  
  
module.exports = router;


