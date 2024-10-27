const express = require("express");
const { createAppointement } = require("../Controllers/AppointementController");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const router = express.Router();


router.post("/createAppointment" , isLoggedIn , createAppointement)


module.exports = router