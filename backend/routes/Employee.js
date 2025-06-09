const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employeeControllers");
const { authenticateToken } = require('../auth/auth');

// Employee routes
router.post('/loginEmployee', employeeController.loginEmployee);
router.post('/registerEmployee', employeeController.registerEmployee);
router.get('/getAllEmployees', authenticateToken, employeeController.getAllEmployees);
router.get('/getAllEmployeeData',authenticateToken,employeeController.getAllEmployeesData )



module.exports = router;