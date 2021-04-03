// Requiring and initializing the express object
const express = require("express");
const mongoose=require('mongoose');
// const bodyParser=require('body-parser');
const ejs=require('ejs');
const morgan=require("morgan");
const cors = require("cors");

const app=express();
const PORT=process.env.PORT||8080;

// app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
// A kind of bodyParser. It makes the json objects available.
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

// CORS error
app.use(cors({
  origin: "http://localhost:3000/",
  credentials: true
}));

mongoose.connect("mongodb://localhost:27017/teacher",{useNewUrlParser:true,useUnifiedTopology:true});

const teacherSchema=new mongoose.Schema({
  fn:String,
  email:String,
  pw:String,
  classesEnrolled:[]
});
const teacher=mongoose.model('teacher',teacherSchema);

const classroomSchema=new mongoose.Schema({
  id:String,
  name:String,
  participantList:[]
});
const classroom=mongoose.model("classroom",classroomSchema);

app.get("/dashboard/:email",function(req,res){
  teacher.findOne({email:req.params.email},function(err,foundTeacher){
    if(err){
      console.log(err);
    }
    else{
      res.status(200).json({"classesEnrolled":foundTeacher});
    }
  })
})


//handles post request when users login or registered
app.post("/teacher_register",function(req,res){
  const data=new teacher({
    fn:req.body.fn,
    email:req.body.email,
    pw:req.body.pw,
    classesEnrolled:[]
  });
  teacher.findOne({email:data.email},function(err,foundTeacher){
    if(err){
      console.log(err);
    }
    else{
      if(foundTeacher){
        console.log("Email already exists. Try another account.");
        // res.redirect("/login");
      }
      else{
        data.save(function(err){
          if(!err){
          res.status(200).json({email:data.email});
        }
      });
      }
    }
  })
})
//handles login information
app.post("/login",function(req,res){
  const enteredEmail=req.body.email;
  const enteredPassword=req.body.password;
  teacher.findOne({email:enteredEmail},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
        if(foundUser&& foundUser.email===enteredEmail && foundUser.pw===enteredPassword){
          res.status(200).json({email:enteredEmail});
          // Send user to dashboard
          console.log("user found");
        }
        else{
          console.log("Enter correct password");
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
app.post("/createclassroom/:email",function(req,res){
  
  teacher.findOne({email:req.params.email},function(err,foundTeacher){
    if(err){
      console.log(err);
    }
    else{
      const data=new classroom({
        id:makeid(6),
        name:req.body.className,
        participantList:[foundTeacher.name]
        });    
        foundTeacher.classesEnrolled.push([data.name,data.id]);
        foundTeacher.save(function(err){
          if(!err){
            console.log("teacher updated")
          }
        })
          data.save(function(err){
          if(!err){
          console.log("Classroom created.")
        }
      });
    }
  })   
});



// Listening to the port 8080.
app.listen(PORT, function(){
  console.log("Server is listening to port 8080.");
});
