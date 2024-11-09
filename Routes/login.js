const express = require("express");
const { login } = require("../Controllers/userController");
const router = express.Router();

router.post("/", login)

router.get("/" , (req,res) => {
    res.render('login')
})

module.exports = router;