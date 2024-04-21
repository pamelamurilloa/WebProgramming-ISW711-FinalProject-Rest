const express = require('express');
const router = express.Router()

const {
    playlistPatch,
    playlistPatchVideo,
    playlistPost,
    playlistPostVideo,
    playlistGet,
    playlistGetAll,
    playlistDelete,
    playlistDeleteVideo
  } = require("../controllers/playlistController.js");

router.get("/:id", playlistGet);
router.get("/user/:userId", playlistGetAll);
router.post("/", playlistPost); // Creates a playlist
router.post("/:id", playlistPostVideo); // Creates a video in a playlist
router.patch("/:id", playlistPatch);
router.patch("/:id/:videoId", playlistPatchVideo); // Updates a video in a playlist
router.put("/:id", playlistPatch);
router.put("/:id/:videoId", playlistPatchVideo); // Updates a video in a playlist
router.delete("/:id", playlistDelete);
router.delete("/:id/:videoId", playlistDeleteVideo); // Deletes a video in  aplaylist


module.exports = router;