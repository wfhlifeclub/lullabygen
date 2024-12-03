const config = {
  port: process.env.PORT || 3001,
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  },
  audioPath: process.env.AUDIO_PATH || 'public/audio'
};

module.exports = config;