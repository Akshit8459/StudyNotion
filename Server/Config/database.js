const mongoose=require("mongoose")
require("dotenv").config()

exports.connect=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{console.log("Successfully Connected to Database")})
    .catch((err)=>{
        console.log("Error connecting to Database, Error=>",err)
        process.exit(1)
    })
}
