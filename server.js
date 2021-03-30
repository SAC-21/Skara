// Requiring and initializing the express object
const express = require("express");
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const morgan=require("morgan");

const app=express();
const PORT=process.env.PORT||8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));

mongoose.connect("mongodb://localhost:27017/teacher",{useNewUrlParser:true,useUnifiedTopology:true});
const teacherSchema=new mongoose.Schema({
  name:String,
  email:String,
  password:String
});
const teacher=mongoose.model('teacher',teacherSchema);

const classroomSchema=new mongoose.Schema({
  id:String,
  name:String,
  participantList:[]
});
const classroom=mongoose.model("classroom",classroomSchema);

// This get function throws html our home page once the sever gets called on default port 3000.
app.get('/',function(req, res){
  res.sendFile(__dirname + '/html_files/index.html');
});

// This get funstion listens opens up the register page when register butto is clicked upon on the home page
app.get('/register/teacher', function(req,res){
  res.sendFile(__dirname + '/html_files/teacher_register.html');
});
//Handles login route
app.get("/login",function(req,res){
  res.sendFile(__dirname+"/html_files/login.html")
}) ;

//page after registeration or login
app.get("/home",function(req,res){
  res.sendFile(__dirname+"/html_files/home.html")
});

//when teacher clicks on create a classroom
app.get("/createclassroom",function(req,res){
  res.sendFile(__dirname+"/html_files/createclassroom.html")
});


//handles post request when users login or registered
app.post("/home",function(req,res){
  const data=new teacher({
    name:req.body.fn,
    email:req.body.email,
    password:req.body.pw
  });
  teacher.findOne({email:req.body.email},function(err,foundTeacher){
    if(err){
      console.log(err);
    }
    else{
      if(foundTeacher){
        // res.send("Email already exists.");
        res.redirect("/login");
      }
      else{
        data.save(function(err){
          if(!err){
            
  res.redirect('/home');
          console.log("success");
        }
      });
      }
    }
  })
})
//handles login information
app.post("/login",function(req,res){
  teacher.findOne({email:req.body.email},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        if(foundUser.password===req.body.password){
          res.redirect("/home");
        }
      }
    }
  });
});

//storing name and id of a classroom
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
app.post("/createclassroom",function(req,res){
  
  const data=new classroom({
  id:makeid(6),
  name:req.body.name,
  participantList:["sachin"]
  });
  data.save(function(err){
    if(!err){
    console.log('success');
  }
  res.redirect('/home');
  })
});


// Listening to the port 3000.
app.listen(PORT, function(){
  console.log("Server is listening to port 8080.");
});
