const express = require('express');
const router = express.Router()

const {
    loginHandler,
    kidCompare,
    userConfirmCode
  } = require("../controllers/sessionController.js");

router.get("/login", loginHandler);
router.get("/login/code", userConfirmCode);
router.get("/kids/:id/:pin", kidCompare);

module.exports = router;