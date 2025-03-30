// travelogue-api/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const savedRoutes = require('./routes/savedRoutes');
const followRoutes = require('./routes/followRoutes');
const path = require('path');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/followers', followRoutes);

// Database Sync
sequelize.sync().then(() => {
    console.log('Database connected and synced.');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
}).catch(err => console.log(err));
