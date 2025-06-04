const express = require('express');
const router = express.Router();
const userNotes = require('../controllers/notesController');
const { authenticateToken } = require('../auth/auth');

router.post('/register', authenticateToken, userNotes.registerNotes);
router.get('/getnotes', authenticateToken, userNotes.getNotes);
router.delete("/delete/:id", authenticateToken, userNotes.deleteNote);
router.put('/update_Notes', authenticateToken, userNotes.updateNote);



module.exports = router;