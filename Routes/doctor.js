const express = require("express");
const { getDoctor, updateData } = require("../Controllers/doctorController");
const router = express.Router();
const { isLoggedIn } = require("../Middlewares/isLoggedIn");

router.get("/getDoctor", isLoggedIn, getDoctor);

router.patch("/doctor/completed", isLoggedIn, updateData);

module.exports = router;