const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes');
const kidRoutes = require('./kidRoutes');
const sessionRoutes = require('./sessionRoutes');


const express = require('express');
const router = express.Router()

router.use('/playlists', playlistRoutes);
router.use('/users', userRoutes);
router.use('/kids', kidRoutes);
router.use('/session', sessionRoutes);

module.exports = router;

