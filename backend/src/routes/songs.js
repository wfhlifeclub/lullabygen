const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songs');

router.get('/', songsController.getAllSongs);
router.get('/:id', songsController.getSongById);

module.exports = router;