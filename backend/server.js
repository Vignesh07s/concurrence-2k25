const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
const Transaction = require('./models/Transaction');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://concurrence-2k25.vercel.app'],
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://concurrence-2k25.vercel.app'],
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// WebSocket connection
io.on('connection', async (socket) => {

  // Emit the current registration count when a user connects
  try {
    const count = await Transaction.countDocuments();
    socket.emit("updatedRegistrationCount", count);
  } catch (error) {
    console.log('Error fetching registration count:', error);
  }

  // Listen for "NewRegistration" event from the client
  socket.on('NewRegistration', async () => {
    try {
      const count = await Transaction.countDocuments();
      io.emit("updatedRegistrationCount", count);
    } catch (error) {
      console.log('Error emitting registration count:', error);
    }
  });

  socket.on('disconnect', () => {});
});


// Registration and Route routes
app.use('/api/v1/register', require('./routes/registrationRoutes'));
app.use('/api/v1/events', require('./routes/eventRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Event Registration API');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
