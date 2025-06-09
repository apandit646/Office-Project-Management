const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sequelize = require('../db/config'); // Assuming you have a Sequelize instance set up
const User = require('../model/userModel');
const { error } = require('console');
const algorithm = 'HS256';
const secretKey = crypto.createHash('sha256').update(String('your-secret-key')).digest('base64').substr(0, 32);


// empoyee registration and login code


exports.registerEmployee = async (req, res) => {
    console.log('Registering employee:', req.body);
    let { name, email, phoneNo, type, role, password } = req.body; // use let here
    // Ensure user table exists
    try {
        await sequelize.sync(); // This will create the table if it doesn't exist
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create users table' });
    }

    if (!name || !email || !phoneNo || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!type) {
        type = "employee";
    }
    if (!role) {
        role = "developer"; // Default role if not provided
    }

    try {
        const newUser = await User.create({ name, email, phoneNo, type, role, password });
        res.status(201).json({ message: 'Employee registered successfully', userId: newUser.id });
    } catch (err) {
        console.error('Error registering employee:', err);
        res.status(500).json({ error: `${err.message}` });
    }
}
exports.getAllEmployeesData = async (req, res) => {
    try {
        const data = await User.findAll({
            where: {
                type: "manager" // Fixed spelling if "manager" was intended
            }
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.status(200).json({ data });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// login Employee

exports.loginEmployee = async (req, res) => {
    console.log('Logging in user:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email, password } });

        console.log('User found:', user);
        if (user) {
            if (user.type !== 'employee') {
                return res.status(403).json({ error: 'Access denied. Only managers can log in.' });
            }
            jwt.sign(
                { userId: user.id, email: user.email, id: user.id, type: user.type, role: user.role },
                secretKey,
                { algorithm, expiresIn: '10h' },
                (err, token) => {
                    if (err) {
                        console.error('Error generating token:', err);
                        return res.status(500).json({ error: 'Failed to generate token' });
                    }

                    res.status(200).json({
                        message: 'Login successful',
                        data: {
                            id: user.dataValues.id,
                            name: user.dataValues.name,
                            email: user.dataValues.email,
                            phoneNo: user.dataValues.phoneNo,
                            type: user.dataValues.type,
                            role: user.dataValues.role
                        },
                        token
                    });
                }
            );
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get employ from user 
exports.getAllEmployees = async (req, res) => {
    try {
        const { offset = 0, limit = 10 } = req.query;

        const data = await User.findAndCountAll({
            where: { type: 'employee' },
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']]
        });

        if (!data) {
            return res.status(500).json({ error: "Data not found" });
        }

        res.status(200).json({
            employees: data.rows,
            total: data.count
        });
    } catch (err) {
        console.error("Error in getAllEmployees:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
