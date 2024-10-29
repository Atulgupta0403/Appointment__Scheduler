const express = require("express");
const { createAppointement, showAppointments, appointementReschedule } = require("../Controllers/AppointementController");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const router = express.Router();
const {history} = require("../Controllers/adminController")


router.post("/createAppointment" , isLoggedIn , createAppointement)

router.get("/showAppointments" , isLoggedIn , showAppointments)

router.patch("/appointment/reschedule" , isLoggedIn , appointementReschedule)

router.get("/patient/history" , isLoggedIn , history)


module.exports = router