const mongoose=require("mongoose")
const conn=async()=>{
    try{
        const res=await mongoose.connect(
            `${process.env.MONGO_URI}`
        )
        if(res){ console.log("connected to db")}
    }catch(e){
        console.log(e);
    }
};
conn();