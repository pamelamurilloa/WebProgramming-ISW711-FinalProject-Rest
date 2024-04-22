const express = require('express');
const router = express.Router()

const {
    loginHandler,
    kidCompare
  } = require("../controllers/sessionController.js");

router.get("/login", loginHandler);
router.get("/kids/:id/:pin", kidCompare);

module.exports = router;