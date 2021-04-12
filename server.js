// Requiring and initializing the express object
const express = require("express");
const mongoose = require("mongoose");
// const bodyParser=require('body-parser');
// const ejs = require("ejs");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const PORT = process.env.PORT || 8080;
const saltRounds = 10;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
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

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/Skara", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

// Requiring the models
const classroom = require("./models/classroomModel.js");
const student = require("./models/studentModel.js");
const teacher = require("./models/teacherModel.js");
const team = require("./models/teamModel.js");

passport.use(teacher.createStrategy());

passport.serializeUser(teacher.serializeUser());
passport.deserializeUser(teacher.deserializeUser());

// const teams=new team({
//   teamName:"Hagemaru Clan",
//   classAssociated:"606d67a51016184b78b997ea"
// })
// teams.save();

//display dashboard of teacher (shows classes in which teacher is enrolled)
app.get("/dashboard/:username", function (req, res) {
  teacher
    .findOne({ username: req.params.username })
    .populate("classesEnrolled")
    .exec(function (err, foundTeacher) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ classesEnrolled: foundTeacher });
      }
    });
});

// display info of a particular class
app.get("/classpane/:username/:id", function (req, res) {
  classroom.findOne({ classCode: req.params.id }, function (err, foundClass) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ class: foundClass });
    }
  });
});

app.get("/team/:username/:id", function (req, res) {
  classroom
    .findOne({ classCode: req.params.id })
    .populate("teams")
    .exec(function (err, foundClass) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ teams: foundClass.teams });
      }
    });
});

//handles post request when users login or registered
app.post("/teacher_register", function (req, res) {

  teacher.register(
    {
      fn: req.body.fn,
      username: req.body.username,
      classesEnrolled: [],
      invitesPending: [],
    },
    req.body.pw,
    function (err, registeredTeacher) {
      if (err) {
        console.log(err);
      } else {
        console.log("outside auth 1");
        passport.authenticate("local")(req, res, function () {
          console.log("inside authentication");
                  res.status(200).json({ "username": registeredTeacher.username });
                })
        console.log("outside auth 2");
            }              
        });
});

//handles login information
app.post("/login", function (req, res) {
  // const enteredDetails=new teacher({
  //   username:req.body.username,
  //   pw:req.body.password
  // })

  // req.login(enteredDetails,function(err){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //      passport.authenticate("local")(req,res,function(){
  //        if(err){
  //          console.log(err);
  //        }
  //        else{
  //        }
  //      })
  //   }
  // })
  teacher.findOne(
    { username: enteredDetails.username },
    function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          // bcrypt.compare(enteredPassword, foundUser.pw, function(err, result) {
          if (foundUser.pw === enteredDetails.pw) {
            console.log("user found");
            res.status(200).json({ username: enteredDeatails.username });
          } else {
            console.log("Enter correct password");
          }
          // });
        } else {
          console.log("email id does not exist");
        }
      }
    }
  );
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
app.post("/createclassroom/:username", function (req, res) {
  teacher.findOne(
    { username: req.params.username },
    function (err, foundTeacher) {
      if (err) {
        console.log(err);
      } else {
        const data = new classroom({
          className: req.body.className,
          classCode: makeid(6),
          teachers: [foundTeacher._id],
          announcements: [],
          teams: "606d6de3dcc36b45a8fe9091",
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
    }
  );
});

// stores announcement inside classroom model
app.post("/createAnnouncement/:username/:id", function (req, res) {
  const event = new Date();

  classroom.findOne({ classCode: req.params.id }, function (err, foundClass) {
    if (err) {
      console.log(err);
    } else {
      teacher.findOne(
        { username: req.params.username },
        function (err, foundTeacher) {
          const data = {
            author: foundTeacher.fn,
            text: req.body.announcement,
            time: event.toLocaleDateString("en-US"),
          };
          foundClass.announcements.push(data);
          foundClass.save(function (err) {
            if (!err) {
              console.log("Succesfully added announcement");
            }
          });
        }
      );
    }
  });
});

// Listening to the port 8080.
app.listen(PORT, function () {
  console.log("Server is listening to port 8080.");
});
