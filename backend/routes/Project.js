const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/projectControllers');
const { authenticateToken } = require('../auth/auth');

router.post('/regProject', authenticateToken, projectControllers.registerProject);
router.post('/setprojEmployee',authenticateToken,projectControllers.setprojectMember)
router.get('/getProjects', authenticateToken, projectControllers.getProjects);
router.get('/deleteProject/:id', authenticateToken, projectControllers.deleteProject);



module.exports = router;