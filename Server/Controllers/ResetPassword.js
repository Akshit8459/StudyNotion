const User=require("../Models/User")
const mailSender=require("../Utils/mailSender")
const bcrypt=require("bcrypt")
const crypto=require("crypto")

// INCOMPLETE NINCOMPOOP
exports.resetPasswordToken=async (req,res)=>{
    try{

        const {email}=req.body
    
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"No such User Exists"
            })
        }
    
        const token= crypto.randomUUID()
    
        const updatedDetails=await User.findOneAndUpdate({email:email},{token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true})
    
        const url="https://localhost:3000/update-password/"+token
        const body="YOUR PASSWORD RESET LINK IS HERE:"+url
        await mailSender(email,"Password Reset Link for your StudyNotion Account"+url,body)
    
        return res.json({
            success:true,
            message:"Mail sent successfully please check mail to reset password",
            url:url
        })

    }catch(err){
        console.log(err)
        return res.json({
            success:false,
            message:"There was some error while resetting your password",
            err
        })
    }

}

//resetPassword 
exports.resetPassword=async (req,res)=>{
    try{

        const {newPassword,confirmNewPassword,token}=req.body

        if(!newPassword || !confirmNewPassword){
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

        const userDetails=await User.findOne({token:token})
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token expired"
            })
        }

        const hashedPassword=await bcrypt.hash(newPassword,10)

        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true})

        return res.json({
            success:true,
            message:"Password Changed Successfully"
        })


    }catch(err){
        return res.json({
            success:false,
            message:"There was some error during changing of your password"
        })
    }
}