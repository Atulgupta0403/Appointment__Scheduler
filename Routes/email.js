const express = require("express");
const router = express.Router();
const {forgetPasswordHandler, resetPasswordHandler} = require("../Controllers/forgetPass")

router.post("/password/reset" , forgetPasswordHandler);

router.post("/password/reset/:resetToken" , resetPasswordHandler);

module.exports = router;