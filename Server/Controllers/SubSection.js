const SubSection=require("../Models/SubSection")
const Section=require("../Models/Section")
const {uploadImageToCloudinary}=require("../Utils/ImageUploader")
require("dotenv").config()

exports.createSubSection=async (req,res)=>{
    try{
        const {title,timeDuration,description,sectionId}=req.body
        const video=req.files.videoFile
        if(!title||!timeDuration||!description||!sectionId||!video){
            return res.status(400).json({
                success:false,
                message:"Name is required to create section"
            })
        }

        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

        const subSectionDetails=await SubSection.create({title:title,timeDuration:timeDuration,description:description,videoUrl:uploadDetails.secure_url})

        const updatedSection=await Section.findByIdAndUpdate(sectionId,
            {$push:{subSection:subSectionDetails._id}},
            {new:true}).populate("subSection").exec()

        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            data:updatedSection
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error while"
        })
    }
}



exports.updateSubSection =async (req,res)=>{
    try{
        const {title,timeDuration,description,sectionId,subSectionId}=req.body
        const video=req.files.videoFile
        if(!title||!timeDuration||!description||!sectionId||!video){
            return res.status(400).json({
                success:false,
                message:"Name is required to create section"
            })
        }

        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

        const subSectionDetails=await Section.findByIdAndUpdate(subSectionId,{title:title,timeDuration:timeDuration,description:description,videoUrl:uploadDetails.secure_url},{new:true})

        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"unable to update Section. Please try again"
        })
    }
}




exports.deleteSubSection =async (req,res)=>{
    try{
        
        const {subSectionId}=req.body
        const newSection=await Section.findByIdAndDelete(subSectionId)

        return res.status(200).json({
            success:true,
            message:"Section Removed Successfully",
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"unable to delete Section. Please try again"
        })
    }
}
