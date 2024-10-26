import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL)

const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    accountType : {
        type : String,
        enum : [patient , doctor , admin],
        default : patient
    },
    Specialization : {
        type : String,
        require : function() {
            return this.accountType === "doctor"
        },
        default : null
    },

})


module.exports = mongoose.model("User" , userSchema)