const express=require("express")
const router=express.Router()




const{login,sendOTP,changePassword,signUp}=require("../Controllers/Auth")
const {resetPassword,resetPasswordToken}=require("../controllers/ResetPassword")

const {auth}=require("../Middlewares/Auth")




router.post("/login",login)
router.post("/signup",signUp)
router.post("/sendotp",sendOTP)
router.post("/changepassword",changePassword)


router.post("/reset-password-token",resetPasswordToken)
router.post("/reset-password",resetPassword)

module.exports=router;
