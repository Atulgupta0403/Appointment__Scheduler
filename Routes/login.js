const express = require("express");
const { login } = require("../Controllers/userController");
const router = express.Router();

router.post("/", login)

module.exports = router;