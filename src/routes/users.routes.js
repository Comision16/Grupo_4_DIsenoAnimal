const express = require('express');
const {login, register, dashboard, processRegister, processLogin, logout, profile} = require('../controllers/usersController');
const router = express.Router();

/* GET users listing. */
router
  .get('/ingreso', login)
  .post("/ingreso", processLogin)
  .get('/registro', register)
  .post('/registro', processRegister)
  .get("/salir", logout)
  .get('/perfil', profile)
  
module.exports = router;


