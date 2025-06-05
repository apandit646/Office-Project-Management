

// const projectTable = () => {
//     return new Promise((resolve, reject) => {
//         const query = `
//       CREATE TABLE IF NOT EXISTS project_table(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         projectName VARCHAR(255) NOT NULL,
//         clientName VARCHAR(255) NOT NULL UNIQUE,
//         startDate DATE NOT NULL,
//         endDate DATE NOT NULL,
//         status ENUM('ongoing', 'completed', 'on hold') DEFAULT 'ongoing',
//         description TEXT,
//         managerId INT NOT NULL,
//         FOREIGN KEY (managerId) REFERENCES users(id)
//       )
//     `;

//         db.query(query, (err, result) => {
//             if (err) {
//                 console.error('Error creating users table:', err);
//                 return reject(err);
//             }
//             console.log('Users table created or already exists');
//             resolve(true);
//         });
//     });
// };



// exports.registerProject = async (req, res) => {
//     console.log('Registering project:', req.body);
//     const { projectName, clientName, startDate, endDate, status, description } = req.body;
//     const managerId = req.user.id; // Assuming user ID is stored in req.user after authentication

//     // Ensure project table exists
//     try {
//         await projectTable();
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to create project table' });
//     }

//     if (!projectName || !clientName || !startDate || !endDate || !managerId) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     const query = 'INSERT INTO project_table (projectName, clientName, startDate, endDate, status, description, managerId) VALUES (?, ?, ?, ?, ?, ?, ?)';
//     db.query(query, [projectName, clientName, startDate, endDate, status, description, managerId], (err, result) => {
//         if (err) {
//             console.error('Error registering project:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (result.length > 0) {
//             console.log('Project registered successfully');
//             return res.status(201).json({ message: 'Project registered successfully' });
//         } else {
//             return res.status(400).json({ error: 'Failed to register project' });
//         }
//     });
// }
// exports.getProjects = async (req, res) => {
//     const managerId = req.user.id;
//     console.log('Fetching projects for manager ID:', managerId);
//     if (!managerId) {
//         return res.status(400).json({ error: 'Manager ID is required' });
//     }
//     const query = 'SELECT * FROM project_table WHERE managerId = ?'
//     db.query(query, [managerId], (err, results) => {
//         if (err) {
//             console.error('Error fetching projects:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (results.length > 0) {
//             console.log('Projects fetched successfully');
//             return res.status(200).json(results);
//         } else {
//             return res.status(404).json({ message: 'No projects found for this manager' });
//         }
//     });
// };
// exports.deleteProject = async (req, res) => {
//     const projectId = req.params.id;
//     const managerId = req.user.id; // Assuming user ID is stored in req.user after authentication

//     if (!projectId || !managerId) {
//         return res.status(400).json({ error: 'Project ID and Manager ID are required' });
//     }

//     const query = 'DELETE FROM project_table WHERE id = ? AND managerId = ?';
//     db.query(query, [projectId, managerId], (err, result) => {
//         if (err) {
//             console.error('Error deleting project:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (result.affectedRows > 0) {
//             console.log('Project deleted successfully');
//             return res.status(200).json({ message: 'Project deleted successfully' });
//         } else {
//             return res.status(404).json({ error: 'Project not found or you do not have permission to delete it' });
//         }
//     });
// }