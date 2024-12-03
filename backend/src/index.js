const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');
const songsRouter = require('./routes/songs');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(morgan('dev'));
app.use(express.json());

// Serve static audio files
app.use('/audio', express.static(path.join(__dirname, '..', config.audioPath)));

// Routes
app.use('/api/songs', songsRouter);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Not Found', status: 404 } });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});