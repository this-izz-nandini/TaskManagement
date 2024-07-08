const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    tasks:[{
        type:mongoose.Types.ObjectId,
        ref:"task",
    },],
},{timestamps:true});
module.exports=mongoose.model("user",userSchema)