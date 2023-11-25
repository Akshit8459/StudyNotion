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