const express = require("express");
const router = express.Router();
const { signUp } = require("../Controllers/userController")

router.post("/", signUp);

router.get("/" , (req,res) => {
    res.render('index')
})

module.exports = router