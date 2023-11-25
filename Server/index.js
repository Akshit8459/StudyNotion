const express= require("express")
const app=express()


const userRoutes=require("./Routes/User")
const profileRoutes=require("./Routes/Profile")
const courseRoutes=require("./Routes/Course")
const paymentRoutes=require("./Routes/Payment")


const database=require("./Config/database")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const {cloudinaryConnect}=require("./Config/Cloudinary")
const fileUpload=require("express-fileupload")
require("dotenv").config()

const port= process.env.PORT || 4000


database.connect()

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:"http://localhost:3000",
        credential:true,
}))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


cloudinaryConnect()

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/course",courseRoutes)


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"server is up and running"
    })
})

app.listen(port,()=>{
    console.log("app started at port:",port)
})