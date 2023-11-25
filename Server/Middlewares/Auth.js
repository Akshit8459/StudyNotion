const jwt=require("jsonwebtoken")
require("dotenv").config()
const User=require("../Models/User")

//Auth
exports.auth=async (req,res,next)=>{
    try{
        // const token = req.header("Authorisation").replace("Bearer ","") || req.cookies.token || req.body.token
        const token=req.cookies.token || req.body.token
        console.log(token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        try{

            const decode = jwt.decode(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user=decode

        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Could Not Verify Token"
            })
        }
        next()
        
    }catch(err){
        console.log(err)
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}


//isStudent
exports.isStudent=async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"You need a student account to access this route"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while cheking authorization "
        })
    }
}

//isAdmin
exports.isAdmin=async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"You need an admin account to access this route"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while cheking authorization "
        })
    }
}

//isInstructor
exports.isInstructor=async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"You need an instructor account to access this route"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while cheking authorization "
        })
    }
}