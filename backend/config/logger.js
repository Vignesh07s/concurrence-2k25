// config/logger.js
const winston = require('winston');

// Create a logger instance with settings
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),  // Logs to console
        new winston.transports.File({ filename: 'logs/app.log' })  // Optionally log to a file
    ],
});

module.exports = logger;
