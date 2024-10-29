const AppointementModel = require("../Models/AppointementModel")
const userModel = require("../Models/userModel")
const { ApiResponse } = require("../Utils/apiResponse")


const admin = async (req, res) => {

    if (req.user) {
        const user = await userModel.findOne({ username: req.user.username, accountType: "admin" })
        if (user) {
            const email = req.query.email
            if (!email) {
                res.json(new ApiResponse(200, "Doctor email is required"))
            }
            else {
                const doctor = await userModel.findOneAndDelete({ email: email, accountType: "doctor" });
                res.json(new ApiResponse(200, doctor, "Doctor deleted"))
            }
        }
        else {
            res.json(new ApiResponse(200, "you are not authorized to delete any doctor details"))
        }
    }
    else {
        res.json(new ApiResponse(200, "please login"))
    }
}


const history = async (req, res) => {
    if (req.user) {
        const admin = await userModel.findOne({ username: req.user.username , accountType : "admin"})
        if (!admin) {
            res.json(new ApiResponse(200, admin, "Only admin are authorized to see the history"))
        }
        else {
            const Patient_ID = req.query.Patient_ID;
            const allAppoint = await AppointementModel.find({ Patient_ID: Patient_ID });
            const length = allAppoint.length
            res.json(new ApiResponse(200, allAppoint, `There are ${length} appointements total`))
        }
    }
    else{
        res.json(new ApiResponse(200, "please login"))
    }
}


module.exports = { admin, history }