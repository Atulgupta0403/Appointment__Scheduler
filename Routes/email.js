const express = require("express");
const router = express.Router();
const {forgetPasswordHandler, resetPasswordHandler} = require("../Controllers/forgetPass")

router.post("/reset-password" , forgetPasswordHandler);

router.post("/reset-password/:resetToken" , resetPasswordHandler);

module.exports = router;