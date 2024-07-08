const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    desc:{
        type:String,
        required:true,
        unique:true,
    },
    imp:{
        type:Boolean,
        default:false,
    },
    completed:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});
module.exports=mongoose.model("task",taskSchema)