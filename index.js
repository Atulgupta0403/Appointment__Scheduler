require('dotenv').config()

const express = require("express");
const app = express();

app.get("/" , (req,res) => {
    res.send("slash page")
})

app.listen( process.env.PORT || 3000 , () => {
    console.log("App is listening at port 3000");
})