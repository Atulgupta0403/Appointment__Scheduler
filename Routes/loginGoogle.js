const express = require("express")
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")


const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://appointment-scheduler-8na4.onrender.com/auth/google/callback"
    },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        }
    )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

router.get("/" , 
    passport.authenticate("google" , {scope : ["profile" , "email"]})
)

router.get("/callback" , 
    passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const name = req.user.displayName;
    const token = jwt.sign({name} , process.env.SECRET)
    console.log(token)
    res.redirect("/profile")
  }
)



module.exports = router;