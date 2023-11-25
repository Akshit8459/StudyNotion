const RatingsAndReviews=require("../Models/RatingAndReview")
const Course=require("../Models/Course")
const RatingAndReview = require("../Models/RatingAndReview")
const mongoose=require("mongoose")


exports.createRating=async (req,res)=>{
    try{
        const userId=req.user.id
        const {rating,review,courseId}=req.body

        const courseDetails=await Course.findOne({_id:courseId,studentsEnrolled:{$elemMathch:{$eq:userId}}})

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })    
        }

        const alreadyReviewed=await RatingAndReview.findOne({_id:userId,course:courseId})
        
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Student already gave review for the course"
            })
        }


        const ratingReview=await RatingAndReview.create({rating,review,course:courseId,user:userId})

        const updatedCourseDetails=await Course.findByIdAndUpdate({courseId},{$push:{ratingAndReviews:ratingReview._id}},{new:true})

        return res.status(200).json({
            success:true,
            message:"Successfully created review and rating for the course",
            ratingReview
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error while creating rating / review"
        })
    }
}

exports.getAverageRating=async (req,res)=>{
    try{
        const {courseId}=req.body
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjecId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])
        
        if(result.length>0){
            return res.status(200).json({
                success:true,
                message:"Average rating calculated successfully",
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating calculated successfully",
            averageRating:0
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error while"
        })
    }
}


exports.getAllRating=async (req,res)=>{
    try{
        const allReviews=await RatingAndReview.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName email image"
        }).populate({
            path:"course",
            select:"courseName"
        }).exec()

        return res.status(200).json({
            success:true,
            messgae:"All data fetched successfully",
            data:allReviews
        })
        


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error while"
        })
    }
}