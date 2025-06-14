const { INTEGER } = require('sequelize');
const sequelize = require('../db/config'); // Assuming you have a Sequelize instance set up
const Project = require('../model/projectModel'); // Import your Project model
const ProjectTeam = require('../model/projectTeamModel')



exports.registerProject = async (req, res) => {
    console.log('Registering project:', req.body);
    let { projectName, clientName, startDate, endDate, status, description } = req.body;


    const managerId = Number(req.user.id);
    console.log('Manager ID:', managerId);

    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized: manager ID missing' });
    }

    if (!projectName || !clientName || !startDate || !endDate || !managerId || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }


    try {
        const newProject = await Project.create({
            projectName,
            clientName,
            startDate,
            endDate,
            status,
            description,
            managerId,
        });

        res.status(201).json({
            message: 'Project registered successfully',
            projectId: newProject.id,
        });
    } catch (err) {
        console.error('Error registering project:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        console.log("hello")
        const { offset = 0, limit = 10 } = req.query;
        console.log("<<<<<<<<<< offset:", offset, ">>>>>>>>>>>>>> limit:", limit);


        if (offset === undefined || limit === undefined) {
            return res.status(400).json({ error: "Offset or limit parameter is missing." });
        }

        const data = await Project.findAndCountAll({
            where: {
                managerId: req.user.id, // Assuming you get managerId from authenticated user
            },
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
        });

        if (!data) {
            return res.status(404).json({ message: "No projects found." });
        }

        return res.status(200).json(data);

    } catch (err) {
        console.error("Error fetching projects:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};


exports.deleteProject = async (req, res) => {
    const projectId = req.params.id;
    const managerId = req.user.id; // Assuming user ID is stored in req.user after authentication
    console.log('Deleting project ID:', projectId, 'for manager ID:', managerId);
    if (!projectId || !managerId) {
        return res.status(400).json({ error: 'Project ID and Manager ID are required' });
    }
    try {
        const result = await Project.destroy({
            where: {
                id: projectId,
                managerId: managerId,
            },
        });
        if (result > 0) {
            console.log('Project deleted successfully');
            return res.status(200).json({ message: 'Project deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Project not found or you do not have permission to delete it' });
        }
    }
    catch (err) {
        console.error('Error deleting project:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProject = async (req, res) => {
    const projectId = req.params.id;
    const managerId = req.user.id; // Assuming user ID is stored in req.user after authentication
    const { projectName, clientName, startDate, endDate, status, description } = req.body;
    console.log('Updating project ID:', projectId, 'for manager ID:', managerId);
    if (!projectId || !managerId) {
        return res.status(400).json({ error: 'Project ID and Manager ID are required' });
    }
    try {
        const [updated] = await Project.update(
            {
                projectName,
                clientName,
                startDate,
                endDate,
                status,
                description,
            },
            {
                where: {
                    id: projectId,
                    managerId: managerId,
                },
            }
        );
        if (updated) {
            console.log('Project updated successfully');
            return res.status(200).json({ message: 'Project updated successfully' });
        } else {
            return res.status(404).json({ error: 'Project not found or you do not have permission to update it' });
        }
    }
    catch (err) {
        console.error('Error updating project:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//get project details by project ID
exports.getProjectDetails = async (req, res) => {
    const projectId = req.params.id;
    const managerId = req.user.id; // Assuming user ID is stored in req.user after authentication
    console.log('Fetching project details for project ID:', projectId, 'and manager ID:', managerId);
    if (!projectId || !managerId) {
        return res.status(400).json({ error: 'Project ID and Manager ID are required' });
    }
    try {
        const project = await Project.findOne({
            where: {
                id: projectId,
                managerId: managerId,
            },
        });
        if (project) {
            console.log('Project details fetched successfully');
            return res.status(200).json(project);
        } else {
            return res.status(404).json({ error: 'Project not found or you do not have permission to view it' });
        }
    }
    catch (err) {
        console.error('Error fetching project details:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Set project members
exports.setprojectMember = async (req, res) => {
    const data = req.body;
    const managerId = req.user.id;

    console.log("data", data, "managerId", managerId);



    try {
        await sequelize.sync();
        for (const item of data) {
            console.log(item);
            const regdata = await ProjectTeam.create({
                projectId: parseInt(item.id),
                memberId: parseInt(managerId),
                role: item.role
            });

            if (!regdata) {
                // You can choose to throw or just skip/fail silently
                return res.status(400).json({ message: "Failed to assign one or more members" });
            }
        }

        res.status(200).json({ message: "All members assigned successfully" });

    } catch (error) {
        console.error("Error assigning project members:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




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