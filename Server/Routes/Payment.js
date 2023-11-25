const express=require("express")
const router=express.Router()
const {capturePayment,verifySignature}=require("../Controllers/Payment")
const {auth,isInstructor,isAdmin,isStudent}=require("../Middlewares/Auth")


router.post("/capturepayment",auth,isStudent,capturePayment)
router.post("/verifysignature",verifySignature)

module.exports=router
