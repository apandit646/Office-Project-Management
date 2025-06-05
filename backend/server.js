// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/User');
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
