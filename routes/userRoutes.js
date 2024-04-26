const express = require('express');
const router = express.Router()

const {
    userPatch,
    userPost,
    userGet,
    userGetAll,
    userDelete
  } = require("../controllers/userController.js");

router.get("/:id", userGet);
router.get("/", userGetAll);
router.post("/register", userPost);
router.patch("/:id", userPatch);
router.put("/:id", userPatch);
router.delete("/:id", userDelete);

module.exports = router;