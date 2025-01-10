const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const winston = require('winston');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();

// Setup Winston logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

// Middleware
const allowedOrigins = ['https://your-frontend-url.vercel.app'];
app.use(cors());
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// }));
app.use(bodyParser.json());

// Registration and Route routes
app.use('/api/v1/register', require('./routes/registrationRoutes'));
app.use('/api/v1/events', require('./routes/eventRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Registration API');
    logger.info('Test route accessed');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    logger.error(`Error occurred: ${err.message}`);
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong!',
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
