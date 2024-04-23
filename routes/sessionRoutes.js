const express = require('express');
const router = express.Router()

const {
    loginHandler,
    kidCompare,
    userConfirmCode
  } = require("../controllers/sessionController.js");

router.post("/login", loginHandler);
router.post("/login/code", userConfirmCode);
router.post("/kids/:id/:pin", kidCompare); // TODO: change in file

module.exports = router;