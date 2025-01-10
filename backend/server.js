const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://concurrence-2k25.vercel.app/'],
    methods: ['GET', 'POST'],
}));

app.use(bodyParser.json());

// Registration and Route routes
app.use('/api/v1/register', require('./routes/registrationRoutes'));
app.use('/api/v1/events', require('./routes/eventRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Registration API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});