const router=require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
router.post("/sign-in",async(req,res)=>{
    try{
        const {username, email} = req.body;
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        const existingUser= await User.findOne({username});
        const existingEmail= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Username already exists'});
        }else if(username.length<3){
            return res.status(400).json({message:'Username should have atleast 3 characters'});
        }else if(!usernameRegex.test(username)){        
            return res.status(400).json({message:'Only letters, numbers and underscores are allowed.'});
        }
        if(existingEmail){
            return res.status(400).json({message:'Email already exists'});
        }

        const hashedPass=await bcrypt.hash(req.body.password,10);

        const newUser=new User({username:req.body.username, email:req.body.email, password:hashedPass})
        await newUser.save();
        return res.status(200).json({message:'Registered successfully'})
    }catch(e){
        console.log(e);
        return res.status(400).json({message:'Internal server error'});
    }
});

router.post("/log-in", async(req,res)=>{
    const {username, password} = req.body;
    const existingUser= await User.findOne({username});
    if(!existingUser){
        return res.status(400).json({message:'Invalid credentials'});
    }
    bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){ 
            const authClaims=[{name:username},{jti:jwt.sign({},"mySecretKey")}];
            const token=jwt.sign({authClaims},"mySecretKey",{expiresIn:"2d"});
            return res.status(200).json({id:existingUser._id, token:token});
        }else {
            return res.status(400).json({message:'Invalid credentials'});
        }
    })
})
module.exports=router;