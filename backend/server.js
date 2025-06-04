const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// ✅ Correct JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/User');
// const notesRoutes = require('./routes/notes');
app.use('/api/users', userRoutes);
// app.use('/api/notes', notesRoutes);

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
