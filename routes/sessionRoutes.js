const express = require('express');
const router = express.Router()

const {
    loginHandler,
    userConfirmPin,
    kidCompare,
    userConfirmCode
  } = require("../controllers/sessionController.js");

router.post("/login", loginHandler);
router.post("/login/code", userConfirmCode);
router.post("/pin", userConfirmPin)
router.post("/kids", kidCompare);

module.exports = router;