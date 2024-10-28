

const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../Middlewares/isLoggedIn"); 
const { admin } = require("../Controllers/adminController");



router.delete("/delete" , isLoggedIn , admin)


module.exports = router