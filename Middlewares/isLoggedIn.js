const jwt = require("jsonwebtoken");

const isLoggedIn = (req,res,next) => {
    const token = req.cookies.token;
    if(token){
        const data = jwt.verify(token , process.env.SECRET)
        // console.log(data)
        req.user = data;
    }
    else{
        next()
    }

    next();
}


module.exports = {isLoggedIn};