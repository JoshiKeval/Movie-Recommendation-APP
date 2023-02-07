const express=require("express");
const app=express();
const PORT=8000;
const path=require("path");
const appRouter = require("./router/fetchdata");

app.use(express.json())
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.use("/appdata",appRouter);


app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(PORT,(req,res)=>{
    console.log("Server Is Running...")
})

