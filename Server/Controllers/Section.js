const Section=require("../Models/Section")
const Course=require("../Models/Course")


// create update and delete section

exports.createSection =async (req,res)=>{
    try{
        
        const {sectionName,courseId}=req.body
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Name is required to create section"
            })
        }

        const newSection=await Section.create({sectionName:sectionName})

        const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,
            {$push:{courseContent:newSection._id}},
            {new:true}).populate("courseContent").exec()//add another populate for subsection too*********

        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            data:updatedCourseDetails
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error while creating section"
        })
    }
}


//NEED TO BE LOOKED TO*************
exports.updateSection =async (req,res)=>{
    try{
        const {sectionName,sectionId}=req.body
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Name is required to create section"
            })
        }

        const newSection=await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true})

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

exports.deleteSection =async (req,res)=>{
    try{
        
        const {sectionId}=req.body
        const newSection=await Section.findByIdAndDelete(sectionId)

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