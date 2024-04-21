const express = require('express');
const router = express.Router()

const {
    userLogin,
    kidCompare
  } = require("../controllers/sessionController.js");

router.get("/:email/:password", userLogin);
router.get("/kids/:id/:pin", kidCompare);

module.exports = router;