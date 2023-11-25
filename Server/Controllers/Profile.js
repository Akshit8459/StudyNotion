const User=require("../Models/User")
const Profile=require("../Models/Profile")


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

        const userDetails=await User.findById({id})
        const profileDetails=await Profile.findByIdAndUpdate({id:userDetails.additionalDetails},{dateOfBirth:dateOfBirth,about:about,gender:gender,contactNumber:contactNumber},{new:true})

        return res.status(200).json({
            success:true,
            message:" Success in Updating Profile",
            data:profileDetails
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error While Updating Profile"
        })
    }
}


exports.deleteAccount=async (req,res)=>{
    try{

        const id=req.user.id
        const userDetails=await User.findById({id})
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }

        //remove studentenrolled in courses
        //take course id from User and update($pull) Courses.studentsEnrolled
        //multiple course id will come ? how to loop

        await Profile.findByIdAndDelete({id:userDetails.additionalDetails})
        await User.findByIdAndDelete(id)

        return res.status(200).json({
            success:true,
            message:" Success in Deleting Account",
        })

    }catch(err){
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
        })



    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error While Fetching Account Details"
        })
    }
}