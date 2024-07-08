const express=require("express");
const app=express();
require("dotenv").config()
require("./conn/conn")
const cors=require('cors');
const path=require('path');
const UserAPI=require('./routes/user')
const TaskAPI=require('./routes/task')
app.use(cors());
app.use(express.json());
app.use("/api/v1",UserAPI);
app.use("/api/v2",TaskAPI);
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"frontend","build")));
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
})

// app.use("/",(req,res)=>{
//     res.send("Hello from backend");
// })

const PORT=8080;
app.listen(PORT, ()=>{
    console.log("Server started at 8080");
})