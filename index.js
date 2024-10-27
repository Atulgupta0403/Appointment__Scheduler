require('dotenv').config()
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser())


app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("slash page")
})

const register = require("./Routes/signUp");
const login = require("./Routes/login");
const email = require("./Routes/email");
const Appointement = require("./Routes/Appointement");

app.use("/signup", register)
app.use("/login", login)
app.use("/", email)
app.use("/", Appointement)

app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening at port 3000");
})