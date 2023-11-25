const razorpay=require("razorpay")
require("dotenv").config()

const instance=new razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})