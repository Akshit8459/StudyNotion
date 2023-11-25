const mongoose = require("mongoose")
const mailSender=require("../Utils/mailSender")

const OTPSchema=new mongoose.Schema({
   
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }

})

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse= await mailSender(email,"OTP||Verification Email From StudyNotion"+otp,otp)
        console.log("email Sent Successfully:",mailResponse)

    }catch(err){
        console.log("Error occured while sending verification email(OTP):",err.message)
    }
}

//pre middleware for otp
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp)    
    next()
})


module.exports=mongoose.model("OTP",OTPSchema);