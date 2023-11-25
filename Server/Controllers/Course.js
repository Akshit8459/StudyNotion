const Course=require("../Models/Course")
const Tag=require("../Models/Tags")
const User=require("../Models/User")
const {uploadImageToCloudinary}=require("../Utils/ImageUploader")
require("dotenv").config()

exports.createCourse=async (req,res)=>{
    try{

        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body
        const thumbnail=req.file.thumbnailImage

        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!tag){
            return res.status(400).json({
                succes:false,
                message:"All fields are necessary"
            })
        }

        const userId=req.user.id
        const instructorDetails=await User.findById(userId)
        // TODO:Verify That userID and instructorDetails._id are same or diffrent?

        if(!instructorDetails){
            return res.status(400).json({
                succes:false,
                message:"no instructor details found"
            })
        }

        const tagDetails=await Tag.findById(tag)
        if(!tagDetails){
            return res.status(500).json({
                succes:false,
                message:"Tag was not found"
            })
        }

        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url
        })

        await User.findByIdAndUpdate({id:instructorDetails._id},
            {$push:{courses:newCourse._id}},{new:true})

        await Tag.findByIdAndUpdate({tag},{$push:{course:newCourse._id}},{new:true})

        return res.status(200).json({
            success:true,
            message:""
        })
    }catch(err){
        return res.status(500).json({
            succes:false,
            message:"Failed to create new course"
        })
    }
}

exports.showAllCourses=async (req,res)=>{
    try{
        const allCourses= await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true}).populate("instructor").exec()

        return res.status(200).json({
            success:true,
            message:"All Courses Fetched Successsfully",
            data:allCourses
        })

    }catch(err){
        return res.status(500).json({
            succes:false,
            message:"Failed to fetch all course"
        })
    }
}