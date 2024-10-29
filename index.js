require('dotenv').config()
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session")

app.use(cookieParser())


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))


app.use(passport.initialize())
app.use(passport.session())


app.get("/", (req, res) => {
    res.send("<a href='/auth/google'> Login with google </a>")
})

const register = require("./Routes/signUp");
const login = require("./Routes/login");
const email = require("./Routes/email");
const Appointement = require("./Routes/Appointement");
const doctor = require("./Routes/doctor")
const admin = require("./Routes/admin");
const LoginGoogle = require("./Routes/loginGoogle")

app.use("/signup", register)
app.use("/login", login)
app.use("/", email)
app.use("/", Appointement)
app.use("/", doctor)
app.use("/admin", admin)
app.use("/auth/google" , LoginGoogle)



app.get("/profile", (req, res) => {
    res.send(`<h1>Welcome ${req.user.displayName} </h1>`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening at port 3000");
})