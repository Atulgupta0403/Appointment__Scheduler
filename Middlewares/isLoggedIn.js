const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../Utils/apiResponse");

const isLoggedIn = (req,res,next) => {
    const token = req.cookies.token;
    if(token){
        const data = jwt.verify(token , process.env.SECRET)
        // console.log(data)
        req.user = data;
    }
    else{
        res.json(new ApiResponse(200 , "NotLoggedIn" , "pls login"))
    }

    next();
}


module.exports = {isLoggedIn};