const express = require("express");
const { getDoctor } = require("../Controllers/doctorController");
const router = express.Router();
const { isLoggedIn } = require("../Middlewares/isLoggedIn");

router.get("/getDoctor", isLoggedIn, getDoctor);

module.exports = router;