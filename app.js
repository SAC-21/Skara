// Requiring and initializing the express object
const express = require("express");
const mongoose=require('mongoose');
const bodyParser=require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/teacher",{useNewUrlParser:true,useUnifiedTopology:true});
// mongoose.connection.on('connected',console.log(`success`));
// mongoose.Schema
const teacherSchema=new mongoose.Schema({
  name:String,
  lname:String
});
const teacher=mongoose.model('teacher',teacherSchema);

// This get function throws html our home page once the sever gets called on default port 3000.
app.get('/',function(req, res){
  res.sendFile(__dirname + '/html_files/index.html');
});

// This get funstion listens opens up the register page when register butto is clicked upon on the home page
app.get('/register', function(req,res){
  res.sendFile(__dirname + '/html_files/register.html');
});
//Handles login route
app.get("/login",function(req,res){
  res.sendFile(__dirname+"/html_files/login.html")
}) 
app.post("/register",function(req,res){
  const data=new teacher({
    name:req.body.fn,
    lname:req.body.ln
  });
data.save(function(err){
  if(!err){
    console.log("success");
  }
});
  res.send('<h1>Welcome to Skara.</h1>')
})
app.post("/login",function(req,res){
  res.send('<h1>Welcome to Skara.</h1>')
})
// Listening to the port 3000.
app.listen(3000, function(){
  console.log("Server is listening to port 3000.");
});
