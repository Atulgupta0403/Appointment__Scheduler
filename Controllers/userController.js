const { ApiError } = require("../Utils/apiError");
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../Utils/apiResponse");


const signUp = async (req, res) => {
    const { username, firstName, lastName, email, password , accountType , Specialization } = req.body;

    if (!firstName || !lastName || !email || !password || !username) {
        res.json(new ApiResponse(505, "All fields are required" , false , false));
    }

    const user = await userModel.findOne({ $or: [{username}, {email} ] });
    if(password.length <= 6){
        res.json(new ApiResponse(200 , "Password must be greater than 6 letter"))
    }

    else if (user) {
        res.json(new ApiResponse(200 , "Username or email already exist"));
    }
    else {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const User = await userModel.create({
                    username,
                    firstName,
                    lastName,
                    password: hash,
                    email,
                    accountType,
                    Specialization
                })

                const createdUser = await userModel.findOne({_id : User._id}).select("-password -resetToken -resetTokenExpires")
                res.json(new ApiResponse(200, createdUser, " User created"))
            });
        });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    console.log(user)
    if (!user) {
        res.json(new ApiResponse(400 , `User not found with the username : ${username}` , "failed"));
    }
    else {
        bcrypt.compare(password, user.password, function (err, result) {
            console.log(result)
            if (result) {
                const token = jwt.sign({username}, process.env.SECRET)
                console.log(token)
                res.cookie("token", token)
                res.json(`Welcome , ${username}`)
            }
            else {
                res.json(new ApiResponse(400 , "Incorrect password" , "try another password"));
            }
        })
    }
}

module.exports = { signUp, login }