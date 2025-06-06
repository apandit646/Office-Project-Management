const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const employeeControllers = require('../controllers/employeeControllers');
// manger routes 
router.post('/register', userControllers.registerUser);
router.post('/login', userControllers.loginUser);


// Employee routes
router.post('/loginEmployee', employeeControllers.loginEmployee);
router.post('/registerEmployee', employeeControllers.registerEmployee);


module.exports = router;