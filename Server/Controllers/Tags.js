const Tag=require("../Models/Tags")

///CHANGE ALL TAGS TO CATEGORY :`(

exports.createTag=async (req,res)=>{
    try{

        const {name,description}=req.body

        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const tagDetails=await Tag.create({name:name,description:description})

        return res.status(200).json({
            success:true,
            message:"Tag created Successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"There was some error while creating the tag"
        })
    }

}


exports.showAllTags=async (req,res)=>{
    try{

        const allTags=await Tag.find({},{name:true,description:true})
        
        res.status(200).json({
            success:true,
            message:"All tags fetched",
            allTags
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"There was some error while fetching the tags"
        })
    }
}

exports.tagPageDetails=async (req,res)=>{
    try{

        const {tagId}=req.body
        const selectedTag=await Tag.findById(tagId).populate("courses").exec()

        if(!selectedTag){
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        }

        const diffrentTags=await Tag.find({_id:{$ne:tagId}}).populate("courses").exec()

        //aggregate function to get top 10 selleing(highest enrolled) courses


        // **************************************************************

        return res.status(200).json({
            success:true,
            data:{
                selectedTag,
                diffrentTags,
                // topSellingTags
            }
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"error while fetching tag page details"
        })
    }
}