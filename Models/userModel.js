const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique : true,
        required : true
    },
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true
    },
    accountType: {
        type: String,
        enum : ["patient" , "doctor" , "admin"],
        default : "patient"
    },
    Specialization: {
        type: String,
        required : function () {
            return this.accountType === "doctor"
        },
        default: null
    },
    resetToken : {
        type : String,
        default : null,

    },
    resetTokenExpires : {
        type : Date,
        default : null
    },
    Appointments : [
        {
            type : Date 
        }
    ]

})


module.exports = mongoose.model("User", userSchema)