
const db = require('../db/config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const algorithm = 'HS256';
const secretKey = crypto.createHash('sha256').update(String('your-secret-key')).digest('base64').substr(0, 32);
const iv = crypto.createHash('sha256').update(String('your-fixed-iv')).digest('base64').substr(0, 16);




const usertable = () => {
  return new Promise((resolve, reject) => {
    const query = `
      CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phoneNo VARCHAR(15) NOT NULL ,
        type ENUM('employee', 'manager') DEFAULT 'employee',
        password VARCHAR(255) NOT NULL
      )
    `;

    db.query(query, (err, result) => {
      if (err) {
        console.error('Error creating users table:', err);
        return reject(err);
      }
      console.log('Users table created or already exists');
      resolve(true);
    });
  });
};


exports.registerUser = async (req, res) => {
  console.log('Registering user:', req.body);
  const { name, email, phoneNo, type, password } = req.body;


  // Ensure user table exists
  try {
    await usertable();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create users table' });
  }

  if (!name || !email || !phoneNo || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!type) {
    type = "manager";
  }

  const query = 'INSERT INTO users (name, email,phoneNo, type,password) VALUES (?, ?, ?,?,?)';
  db.query(query, [name, email, phoneNo, type, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: `${err.sqlMessage}` });
    }
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
};


// login the user
exports.loginUser = (req, res) => {
  console.log('Logging in user:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];

      jwt.sign(
        { userId: user.id, email: user.email },
        secretKey,
        { algorithm, expiresIn: '10h' },
        (err, token) => {
          if (err) {
            console.error('Error generating token:', err);
            return res.status(500).json({ error: 'Failed to generate token' });
          }

          res.status(200).json({
            message: 'Login successful',
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            },
            token
          });
        }
      );
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
};