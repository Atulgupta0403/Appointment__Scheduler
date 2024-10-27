const { ApiError } = require("../Utils/apiError");
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../Utils/apiResponse");


const signUp = async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.json(new ApiError(404, "All fields are required"));
    }

    const user = await userModel.findOne({ $or: [{username}, {email} ] });

    if (user) {
        res.json("Username or email already exist");
    }
    else {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const createUser = await userModel.create({
                    username,
                    firstName,
                    lastName,
                    password: hash,
                    email
                })
                res.json(new ApiResponse(200, createUser, " User created"))
            });
        });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    console.log(user)
    if (!user) {
        res.json(`User not found with the username : ${username}`)
    }
    else {
        bcrypt.compare(password, user.password, function (err, result) {
            console.log(result)
            if (result) {
                const token = jwt.sign({username}, process.env.SECRET, { expiresIn: 1 })
                console.log(token)
                res.cookie("token", token)
                res.json(`Welcome , ${username}`)
            }
            else {
                res.json("Incorrect password");
            }
        })
    }
}

module.exports = { signUp, login }