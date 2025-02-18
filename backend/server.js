const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const axios = require('axios');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://concurrence-2k25.vercel.app'],
    methods: ['GET', 'POST'],
}));

app.use(bodyParser.json());

// Routes
app.use('/api/v1/register', require('./routes/registrationRoutes'));
app.use('/api/v1/events', require('./routes/eventRoutes'));
app.use('/api/v1/studentDetails', require('./routes/countRoutes'));


app.get('/api/v1/gallery', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?prefix=concurrence-2k24/&type=upload&max_results=70`,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
                    ).toString('base64')}`,
                },
            }
        );

        const imageUrls = response.data.resources.map(image => image.secure_url); // Use secure_url for HTTPS URLs
        res.status(200).json(imageUrls); // Send the image URLs to the frontend
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error.message);
        res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Registration API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
