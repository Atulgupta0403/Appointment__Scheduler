const express = require("express");
const router = express.Router();
const { signUp } = require("../Controllers/userController")

router.post("/", signUp);


module.exports = router