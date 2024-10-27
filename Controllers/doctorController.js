const userModel = require("../Models/userModel");
const {ApiResponse} = require("../Utils/apiResponse");


const getDoctor = async (req, res) => {
    const Specialization = req.query.Specialization;
    if (req.user) {
        const user = await userModel.findOne({ username: req.user.username });

        if (user.accountType === "patient") {
            const doctor = await userModel.find({ Specialization: Specialization })
            const length = doctor.length;
            res.json(new ApiResponse(200 , doctor , `there are ${length} doctor of ${Specialization} Specialization `))
        }
        else{
            res.json("You are not authorized too see the doctors ");
        }
    }
    else{
        res.json(new ApiResponse(200 , "not LoggedIn " , "please login"));
    }
}


module.exports = {getDoctor};