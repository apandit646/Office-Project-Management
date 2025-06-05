// const sequlize = require('../db/config');

// const projectTeam = () => {
//     return new Promise((resolve, reject) => {
//         const query = `
//       CREATE TABLE IF NOT EXISTS projectTeam(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         projectId INT NOT NULL,
//         memberId INT NOT NULL,
//         role ENUM('developer', 'designer', 'tester', 'manager') NOT NULL,
//         FOREIGN KEY (projectId) REFERENCES project_table(id),
//         FOREIGN KEY (memberId) REFERENCES users(id)
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

// exports.registerProjectTeam = async (req, res) => {
//     console.log('Registering project team:', req.body);
//     const { projectId, memberId, role } = req.body;
//     try {
//         await projectTeam();
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to create project team table' });
//     }

//     if (!projectId || !memberId || !role) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     const query = 'INSERT INTO projectTeam (projectId, memberId, role) VALUES (?, ?, ?)';
//     db.query(query, [projectId, memberId, role], (err, result) => {
//         if (err) {
//             console.error('Error registering project team:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (result.affectedRows > 0) {
//             console.log('Project team registered successfully');
//             return res.status(201).json({ message: 'Project team registered successfully' });
//         } else {
//             return res.status(400).json({ error: 'Failed to register project team' });
//         }
//     });
// };
