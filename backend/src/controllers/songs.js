const songs = require('../data/songs');

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

exports.getAllSongs = async (req, res, next) => {
  try {
    res.json(songs);
  } catch (error) {
    next(new ApiError('Failed to fetch songs', 500));
  }
};

exports.getSongById = async (req, res, next) => {
  try {
    const song = songs.find(s => s.id === req.params.id);
    if (!song) {
      throw new ApiError('Song not found', 404);
    }
    res.json(song);
  } catch (error) {
    next(error);
  }
};