const User=require("../Models/User")
const Profile=require("../Models/Profile")
const {uploadImageToCloudinary}=require("../Utils/ImageUploader")
require("dotenv").config()


exports.updateProfile=async (req,res)=>{
    try{

        const {dateOfBirth="",about="",gender,contactNumber}=req.body
        const id=req.user.id

        if(!contactNumber||!gender||!id){
            return res.status(400).json({
                success:false,
                message:"All fields are necessary"
            })
        }

        const userDetails=await User.findById(id)
        console.log("userDetails=>",userDetails.additionalDetails.toString());
        const profileDetails=await Profile.findByIdAndUpdate(userDetails.additionalDetails.toString(),{dateOfBirth:dateOfBirth,about:about,gender:gender,contactNumber:contactNumber},{new:true})

        return res.status(200).json({
            success:true,
            message:" Success in Updating Profile",
            data:profileDetails
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error While Updating Profile"
        })
    }
}


exports.deleteAccount=async (req,res)=>{
    try{

        const id=req.user.id
        const userDetails=await User.findById(id)
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }

        //remove studentenrolled in courses
        //take course id from User and update($pull) Courses.studentsEnrolled
        //multiple course id will come ? how to loop

        await Profile.findByIdAndDelete(userDetails.additionalDetails.toString())
        await User.findByIdAndDelete(id)

        return res.status(200).json({
            success:true,
            message:" Success in Deleting Account",
        })

    }catch(err){

        console.log("deleting profile error->",err)
        return res.status(500).json({
            success:false,
            message:"Error While Deleting Account"
        })
    }
}


exports.getAllUserDetails=async (req,res)=>{
    try{

        const id=req.user.id

        const userDetails=await User.findById(id).populate("additionalDetails").exec()
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:" Success in Fetching Account's all Details",
            data:userDetails
        })



    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error While Fetching Account Details"
        })
    }
}

exports.getEnrolledCourses=async (req,res)=>{
    try{
        const userId=req.user.id
        const userDetails=await User.find({_id:userId}).populate("courses").exec()
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"data not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"enrolled courses fetched successfully",
            data:userDetails.courses
        })
    }catch(err){
        return res.status(500).json({
                success:false,
                message:"error while fetching enrolled courses"
            })
    }
}


exports.updateDisplayPictures=async (req,res)=>{
    try{
        // some code i am not able to think of
        // validate from body and const file too
        const image=req.file.profileImage
        if(!image){
            return res.status(404).json({
                success:false,
                message:"data not found"
            })
        }
        // upload to cloudinary
        const updatedImage=await uploadImageToCloudinary(image,process.env.FOLDER_NAME)
        
        // await Profile.findByIdAndUpdate({_id:})
        // fetch db and update
        // send statuse

    }catch(err){
        return res.status(500).json({
                success:false,
                message:"error while  updating display picture"
            })
    }
}