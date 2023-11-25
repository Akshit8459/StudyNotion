const express=require("express")
const router=express.Router()
const {auth}=require("../Middlewares/Auth")   
const {deleteAccount,getAllUserDetails,updateProfile,updateDisplayPictures,getEnrolledCourses}=require("../Controllers/Profile")

router.delete("/deleteprofile",deleteAccount)
router.put("/updateprofile",auth,updateProfile)
router.get("/getuserdetails",auth,getAllUserDetails)

router.get("/getenrolledcourses",getEnrolledCourses)
// router.put("/updatedisplaypicture",updateDisplayPictures)

module.exports=router