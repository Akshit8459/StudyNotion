const {instance}=require("../Config/razorpay")
const Course=require("../Models/Course")
const User=require("../Models/User")
const mailSender=require("../Utils/mailSender")
const mongoose=require("mongoose")


exports.capturePayment =async (req,res)=>{
    const {courseId}=req.body
    const userId=req.user.id

    if(!courseId){
        return res.status(400).json({
            success:false,
            message:"Please provide valid catch id"
        })
    }

    let course
    try{

        course=await Course.findById(courseId)
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Please provide valid catch id"
            })
        }

        const uid=mongoose.Types.ObjectId(userId)
        if(course.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"Student Already Enrolled"
            })
        }

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error while Validating"
        })
    }

    const amount=course.price
    const currency="INR"
    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId,
            userId
        }
    }

    try{
        const paymentResponse=await instance.orders.create(options)
        return res.status().json({
            success:true,
            message:"",
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Could not initiate order"

        })
    }
}


exports.verifySignature=async (req,res)=>{
    
    const webhook="12345678"

    const signature=req.header["x-razorpay-signature"]

    const shasum=crypto.createHmac("sha512",webhook)
    shasum.update(JSON.stringify(req.body))

    const digest=shasum.digest("hex")

    if(signature===digest){
        // payment authorised
        const {courseId,userId}=req.body.payload.payment.entity.notes
        try{

            const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})

            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Error while adding student to the course"
                })
            }

            const enrolledStudent=await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true})

            if(!enrolledStudent){
                return res.status(400).json({
                    success:false,
                    message:"Error while adding course to the student data"
                })
            }

            //confirmation mail
            const emailResponse=await mailSender(enrolledStudent.email,"Successfully added to new Course","Congratulations,You are onboarded into new Course")

            return res.status(200).json({
                success:true,
                message:"Successfully enrolled student to course",
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:"Cannot add student to course"
            })
        }
    }
    else{
        return  res.status(500).json({
            success:false,
            message:"Authentication of razorpay payment failex"
        })
    }
}