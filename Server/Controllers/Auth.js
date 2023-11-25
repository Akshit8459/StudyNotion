const User=require("../Models/User") 
const OTP=require("../Models/Otp")
const Profile=require("../Models/Profile")
const otpGenerator=require("otp-generator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()


//Signup
exports.signUp=async (req,res)=>{
    try{ 

        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Please fill all the details to Sign Up!"
            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password And Confirm Password Do not match. Please Try Again!"
            })
        }

        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }

        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1)

        if(recentOTP.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP not Found"
            })
        }else if(otp!== recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
                otp:recentOTP,
                received:otp
            })
        }

        const hashedPassword= await bcrypt.hash(password,10)

        const profileDetail=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:contactNumber

        })

        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetail._id,
            image:"https:api.dicebear.com/5.x/initials/svg?seed="+firstName+" "+lastName})
        
        return res.status(200).json({
            success:true,
            message:"User SignedUp successfully",
            data:user
        })
        
    }catch(err){
        console.log("Error while signing up:",err.message)
        return res.status(500).json({
            success:false,
            message:"User Cannot Be Registered.Please Try Again"
        })

    }
}


//Login
exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body

        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:"Please Fill All The Details"
            })
        }

        const user=await User.findOne({email}).populate("additionalDetails")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Not A user. Please Sign Up first"
            })
        }

        //jwt Token
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
            //user.toObject()
            user.token=token
            user.password=undefined
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password Is Incorrect"
            })
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Could Not Login.Please Try Again",
            error:err.message
        })
    }
}


//Send OTP
exports.sendOTP=async (req,res)=>{
    try{ 
        const {email}=req.body

        const checkUserPresent=await User.findOne({email})

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Exists"
            })
        }
        
        //need for better code here
        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        const result= await OTP.findOne({otp:otp})
        
        while(result){
            otp= otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            const result= await OTP.findOne({otp:otp})
        }
        //change for better code till here 

        const otpPayload={email,otp}

        const otpBody=await OTP.create(otpPayload)

        res.status(200).json({
            success:true,
            message:"OTP sent Successfully",
            otp:otp
        })

    }catch(err){
        console.log("Error while sending OTP:",err.message)
    }
}


//Change Password
// INCOMPLETE NINCOMPOOP

exports.changePassword=async (req,res)=>{
    try{
        
        const {email}=req.body
        const {oldPassword,newPassword,confirmNewPassword}=req.body

        if(!email || !oldPassword || !newPassword || !confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"Please fill All the fields"
            })
        }
        if(newPassword!==confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"New Password and Confirmation Of New Password do not match"
            })
        }

        await User.findOneAndUpdate({email},{password:newPassword})

        //send mail Password Updated
        return res.status(200).json({
            success:true,
            message:"Password Changed Successfully"
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Could not change password"
        })
    }
}