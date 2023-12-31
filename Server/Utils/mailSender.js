const nodemailer=require("nodemailer")
require("dotenv").config()

const mailSender=async(email,title,body)=>{
    try{

        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info=transporter.sendMail({
            from:"StudyNotion || An EdTech Platform- by Akshit ",
            to:email,
            subject:title,
            html:"<h1>Thanks for visiting StudyNotion</h1><p>Link inside mail body is ->"+body+"</p>"
        })
        console.log(info)
        return info
    }catch(err){
        console.log(err.message);

    }
}
module.exports=mailSender;