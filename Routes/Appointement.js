const express = require("express");
const { createAppointement, showAppointments } = require("../Controllers/AppointementController");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const router = express.Router();


router.post("/createAppointment" , isLoggedIn , createAppointement)

router.get("/showAppointments" , isLoggedIn , showAppointments)


module.exports = router