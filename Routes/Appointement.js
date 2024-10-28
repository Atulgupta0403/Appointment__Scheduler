const express = require("express");
const { createAppointement, showAppointments, appointementReschedule } = require("../Controllers/AppointementController");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const router = express.Router();


router.post("/createAppointment" , isLoggedIn , createAppointement)

router.get("/showAppointments" , isLoggedIn , showAppointments)

router.patch("/appointment/reschedule" , isLoggedIn , appointementReschedule)

module.exports = router