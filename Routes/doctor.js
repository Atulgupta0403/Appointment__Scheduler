const express = require("express");
const { getDoctor, updateData, doctorAvailability } = require("../Controllers/doctorController");
const router = express.Router();
const { isLoggedIn } = require("../Middlewares/isLoggedIn");

router.get("/getDoctor", isLoggedIn, getDoctor);

router.patch("/doctor/completed", isLoggedIn, updateData);

router.get("/doctor/availability" , isLoggedIn , doctorAvailability);

module.exports = router;