// Requiring and initializing the express object
const express = require("express");
const mongoose = require("mongoose");
// const bodyParser=require('body-parser');
const ejs = require("ejs");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(morgan("tiny"));
// A kind of bodyParser. It makes the json objects available.
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// CORS error
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);

mongoose.connect("mongodb://localhost:27017/teacher", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Requiring the models
const classroom = require("./models/classroomModel.js");
const student = require("./models/studentModel.js");
const teacher = require("./models/teacherModel.js");
const team = require("./models/teamModel.js");

// const teams=new team({
//   teamName:"Hagemaru Clan",
//   classAssociated:"606d67a51016184b78b997ea"
// })
// teams.save();

//display dashboard of teacher (shows classes in which teacher is enrolled)
app.get("/dashboard/:email", function (req, res) {
  teacher
  .findOne({ email: req.params.email })
  .populate("classesEnrolled")
  .exec(function (err, foundTeacher) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ "classesEnrolled": foundTeacher });
    }
  });
});

// display info of a particular class
app.get("/classpane/:email/:id",function(req,res){
  classroom.findOne({classCode:req.params.id},function(err,foundClass){
    if(err){
      console.log(err);
    }
    else{
      res.status(200).json({"class":foundClass});
    }
  })
})


app.get("/team/:email/:id",function(req,res){
  classroom
  .findOne({classCode:req.params.id})
  .populate("teams")
  .exec(function(err,foundClass){
    if(err){
      console.log(err)
    }else{
      res.status(200).json({"teams":foundClass.teams});
    }
  })
})

//handles post request when users login or registered
app.post("/teacher_register", function (req, res) {
  const data = new teacher({
    fn: req.body.fn,
    email: req.body.email,
    pw: req.body.pw,
    classesEnrolled: [],
    invitesPending: [],
  });
  teacher.findOne({ email: data.email }, function (err, foundTeacher) {
    if (err) {
      console.log(err);
    } else {
      if (foundTeacher) {
        console.log("Email already exists. Try another account.");
        // res.redirect("/login");
      } else {
        data.save(function (err) {
          if (!err) {
            res.status(200).json({ email: data.email });
          }
        });
      }
    }
  });
});
//handles login information
app.post("/login", function (req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  teacher.findOne({ email: enteredEmail }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (
        foundUser &&
        foundUser.email === enteredEmail &&
        foundUser.pw === enteredPassword
      ) {
        res.status(200).json({ email: enteredEmail });
        // Send user to dashboard
        console.log("user found");
      } else {
        console.log("Enter correct password");
      }
    }
  });
});

//storing name and id of a classroom
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
//creates classroom inside classroom model and link it with teacher id
app.post("/createclassroom/:email", function (req, res) {
  
  teacher.findOne({ email: req.params.email }, function (err, foundTeacher) {
    if (err) {
      console.log(err);
    } else {
      const data = new classroom({
        className: req.body.className,
        classCode: makeid(6),
        teachers: [foundTeacher._id],
        announcements: [],
        teams:"606d6de3dcc36b45a8fe9091"
      });
      data.save(function (err, result) {
        if (!err) {
          foundTeacher.classesEnrolled.push(result._id);
          foundTeacher.save(function (err) {
            if (!err) {
              console.log("teacher updated");
            }
          });
        }
      });
    }
  });
});

// stores announcement inside classroom model 
app.post("/createAnnouncement/:email/:id",function(req,res){
  const event = new Date();

  classroom.findOne({ classCode: req.params.id }, function (err, foundClass) {
    if (err) {
      console.log(err);
    } else {
      teacher.findOne({email:req.params.email},function(err,foundTeacher){
        const data={
          author:foundTeacher.fn,
          text:req.body.announcement,
          time:event.toLocaleDateString('en-US')
        }
        foundClass.announcements.push(data);
        foundClass.save(function(err){
          if (!err) {
            console.log("Succesfully added announcement");   
          }
        })
      })
    }
  });
})

// Listening to the port 8080.
app.listen(PORT, function () {
  console.log("Server is listening to port 8080.");
});
