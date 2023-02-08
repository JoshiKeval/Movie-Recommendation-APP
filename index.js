const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT;
const path=require("path");
const appRouter = require("./router/fetchdata");
app.use(express.json())

const static_path = path.join(__dirname, "./public/");
app.use(express.static(static_path));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.use(express.urlencoded({extended: true}))
app.use("/appdata",appRouter);


app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(PORT,(req,res)=>{
    console.log("Server Is Running...")
})

