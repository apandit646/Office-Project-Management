
const db = require('../db/config');

const notestable = () => {
    return new Promise((resolve, reject) => {
        const query = `
            CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `;

        db.query(query, (err, result) => {
            if (err) {
                console.error('Error creating notes table:', err);
                return reject(err);
            }
            console.log('Notes table created or already exists');
            resolve(true);
        });
    });
};

exports.registerNotes = async (req, res) => {

    const { title, content } = req.body;
    const user_id = req.user.userId; // Assuming user ID is stored in req.user after authentication

    try {
        await notestable();
    } catch (error) {
        console.error('Error ensuring notes table exists:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user_id || !title || !content) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)';
    db.query(query, [user_id, title, content], (err, result) => {
        if (err) {
            console.error('Error registering note:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Note registered successfully' });
        } else {
            res.status(500).json({ error: 'Failed to register note' });
        }
    });
}

exports.getNotes = async (req, res) => {
    const user_id = req.user.userId; // Assuming user ID is stored in req.user after authentication

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const query = 'SELECT * FROM notes WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json(results);
    });
}

exports.deleteNote = async (req, res) => {
    const noteId = req.params.id;
    const user_id = req.user.userId; // Assuming user ID is stored in req.user after authentication

    if (!noteId || !user_id) {
        return res.status(400).json({ error: 'Note ID and User ID are required' });
    }

    const query = 'DELETE FROM notes WHERE id = ? AND user_id = ?';
    db.query(query, [noteId, user_id], (err, result) => {
        if (err) {
            console.error('Error deleting note:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Note deleted successfully' });
        } else {
            res.status(404).json({ error: 'Note not found or you do not have permission to delete it' });
        }
    });
}
exports.updateNote = async (req, res) => {
    const { id, title, content } = req.body;
    const user_id = req.user.userId; // Assuming user ID is stored in req.user after authentication

    if (!id || !title || !content || !user_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?';
    db.query(query, [title, content, id, user_id], (err, result) => {
        if (err) {
            console.error('Error updating note:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Note updated successfully' });
        } else {
            res.status(404).json({ error: 'Note not found or you do not have permission to update it' });
        }
    });
}

