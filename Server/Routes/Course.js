const express=require("express")
const router=express.Router()
const {createCourse,getCourseDetail,showAllCourses}=require("../Controllers/Course")
const {createTag,showAllTags,tagPageDetails}=require("../Controllers/Tags")
const {createSection,deleteSection,updateSection}=require("../Controllers/Section")
const {createSubSection,deleteSubSection,updateSubSection}=require("../Controllers/SubSection")
const {createRating,getAllRating,getAverageRating}=require('../Controllers/RatingAndReview')
const {auth,isAdmin,isInstructor,isStudent}=require("../Middlewares/Auth")


router.post("/createcourse",auth,isInstructor,createCourse)

router.post("/addsection",auth,isInstructor,createSection)
router.put("/updatesection",auth,isInstructor,updateSection)
router.delete("/deletesection",auth,isInstructor,deleteSection)

router.post("/addsubsection",auth,isInstructor,createSubSection)
router.put("/updatesubsection",auth,isInstructor,updateSubSection)
router.delete("/deletesubsection",auth,isInstructor,deleteSubSection)

router.get("/getallcourses",showAllCourses)
router.post("/getcoursedetail",getCourseDetail)

router.post("/createcategory",auth,isAdmin,createTag)
router.get("/getallcategory",showAllTags)
router.get("/getcategorypagedetails",tagPageDetails)

router.post("/createrating",auth,isStudent,createRating)
router.get("/getaveragerating",getAverageRating)
router.get("/getreviews",getAllRating)

module.exports=router