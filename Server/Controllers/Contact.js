const mailSender=require("../Utils/mailSender")

exports.contactUs=async (req,res)=>{
    try{
        const {firstName,lastName,email,phoneNumber,message}=req.body

        const mail=await mailSender(email,"Thankyou for Contacting Us || via StudyNotion","Thanks for providing your valuable time and effort to go through the website and contacting us & providing us with your feedbacks.")

        return res.status(200).json({
            success:true,
            message:"mail sent successfully",
            data:{
                firstName,
                lastName,
                email,
                phoneNumber,
                message,
                mailLog:mail
            }
        })

    }catch(err){
        return res.status(200).json({
            success:false,
            message:"error while contacting the admin",
        })
    }
}

