const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes');
const kidRoutes = require('./kidRoutes');
const sessionRoutes = require('./sessionRoutes');
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router()

const theSecretKey = process.env.JWT_SECRET;

// JWT Authentication middleware
router.use(function (req, res, next) {
    if(req.url.includes('login') || req.url.includes('register')) {
        return next()
    }

    if (req.headers["authorization"]) {
      const authToken = req.headers['authorization'].split(' ')[1];
      try {
        jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
          if (err || !decodedToken) {
            res.status(401);
            res.json({
              error: "Unauthorized"
            });
          }
          next();
        });
      } catch (e) {
        console.error('There was an error', e);
        res.send({
          error: "Unauthorized "
        }).status(401);
      }
    } else {
      res.status(401);
      res.send({
        error: "Unauthorized "
      });
    }
  });

router.use('/playlists', playlistRoutes);
router.use('/users', userRoutes);
router.use('/kids', kidRoutes);
router.use('/session', sessionRoutes);

module.exports = router;

