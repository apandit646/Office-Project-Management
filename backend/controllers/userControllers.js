const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sequelize = require('../db/config'); // Assuming you have a Sequelize instance set up
const User = require('../model/userModel');
const algorithm = 'HS256';
const secretKey = crypto.createHash('sha256').update(String('your-secret-key')).digest('base64').substr(0, 32);


exports.registerUser = async (req, res) => {
  console.log('Registering user:', req.body);
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
    type = "manager";
  }
  if (!role) {
    role = "developer"; // Default role if not provided
  }

  try {
    const newUser = await User.create({ name, email, phoneNo, type, role, password });
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: `${err.message}` });
  }
}



// login the user
exports.loginUser = async (req, res) => {
  console.log('Logging in user:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email, password } });

    console.log('User found:', user);
    if (user) {
      if (user.type !== 'manager') {
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



// exports.registerUser = async (req, res) => {
//   console.log('Registering user:', req.body);
//   const { name, email, phoneNo, type, password } = req.body;


//   // Ensure user table exists
//   try {
//     await usertable();
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to create users table' });
//   }

//   if (!name || !email || !phoneNo || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }
//   if (!type) {
//     type = "manager";
//   }

//   const query = 'INSERT INTO users (name, email,phoneNo, type,password) VALUES (?, ?, ?,?,?)';
//   db.query(query, [name, email, phoneNo, type, password], (err, result) => {
//     if (err) {
//       console.error('Error registering user:', err);
//       return res.status(500).json({ error: `${err.sqlMessage}` });
//     }
//     if (result.affectedRows > 0) {
//       res.status(201).json({ message: 'User registered successfully' });
//     } else {
//       res.status(500).json({ error: 'Failed to register user' });
//     }
//   });
// };


// // login the user
// exports.loginUser = (req, res) => {
//   console.log('Logging in user:', req.body);
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   db.query(query, [email, password], (err, results) => {
//     if (err) {
//       console.error('Error logging in user:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     if (results.length > 0) {
//       const user = results[0];

//       jwt.sign(
//         { userId: user.id, email: user.email },
//         secretKey,
//         { algorithm, expiresIn: '10h' },
//         (err, token) => {
//           if (err) {
//             console.error('Error generating token:', err);
//             return res.status(500).json({ error: 'Failed to generate token' });
//           }

//           res.status(200).json({
//             message: 'Login successful',
//             user: {
//               id: user.id,
//               name: user.name,
//               email: user.email
//             },
//             token
//           });
//         }
//       );
//     } else {
//       res.status(401).json({ error: 'Invalid email or password' });
//     }
//   });
// };