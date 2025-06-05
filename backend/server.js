// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/User');
const projectRoutes = require('./routes/Project');
app.use('/api/users', userRoutes);
app.use('/api/project', projectRoutes);

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
