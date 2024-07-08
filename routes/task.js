const router=require("express").Router();
const Task=require("../models/task");
const User=require("../models/user");
const authenticateToken = require("./auth");

router.post("/create-task",authenticateToken,async(req,res)=>{
    try{
        const {title,desc}=req.body;
        const {id}=req.headers;
        const newTask=new Task({title:title, desc:desc});
        const saveTask=await newTask.save();
        const taskId=saveTask._id;
        await User.findByIdAndUpdate(id,{$push:{tasks: taskId._id}});
        return res.status(200).json({message:'Task created.'});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
});

router.get("/get-all-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate({
            path:'tasks',
            options: {sort:{createdAt:-1}},
        });
        return res.status(200).json({data:userData});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

router.get("/get-imp-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({
            path:'tasks', match:{imp:true},
            options: {sort:{createdAt:-1}},
        });
        const impTaskData=Data.tasks;
        return res.status(200).json({data:impTaskData});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

router.get("/get-complete-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({
            path:'tasks', match:{completed:true},
            options: {sort:{createdAt:-1}},
        });
        const compTaskData=Data.tasks;
        return res.status(200).json({data:compTaskData});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

router.get("/get-incomplete-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({
            path:'tasks', match:{completed:false},
            options: {sort:{createdAt:-1}},
        });
        const incompTaskData=Data.tasks;
        return res.status(200).json({data:incompTaskData});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

router.delete("/delete-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull:{tasks:id}})
        return res.status(200).json({message:'Task deleted successfully!'});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

router.put("/update-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.params;
        const {title, desc}=req.body;
        await Task.findByIdAndUpdate(id,{title:title,desc:desc})
        return res.status(200).json({message:'Task updated successfully!'});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

router.put("/update-imp-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.params;
        const taskData=await Task.findById(id);
        const impTask=taskData.imp;
        await Task.findByIdAndUpdate(id,{imp:!impTask})
        return res.status(200).json({message:'Task updated successfully!'});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

router.put("/update-complete-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.params;
        const taskData=await Task.findById(id);
        const compTask=taskData.completed;
        await Task.findByIdAndUpdate(id,{completed:!compTask})
        return res.status(200).json({message:'Task updated successfully!'});
    }catch(e){
        console.log(e);
        res.status(400).json({message:'Internal server error'});
    }
})

module.exports=router;