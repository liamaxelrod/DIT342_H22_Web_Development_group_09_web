const express = require("express");
const router = express.Router();
const User = require("../models/user");                                                                      
const Schedule = require("../models/schedule");
const ObjectId = require('mongoose').Types.ObjectId;
//// const user = require("../models/user");

//  Creates a user // in use  // postman by liam
router.post("/api/users", function (req, res, next) {
  var user = new User(req.body);
  user.save(function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(201).json(user);
  });
});

//  Gets all users //in use
router.get("/api/users", function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(err);
    }
    if (users === null) {
      return res
        .status(404)
        .json({ message: "No registered users. Register users to view them" });
    }
    res.json({ users: users });
  });
});

//  Gets a user with the requested username 
// router.get("/api/users/:username", function (req, res, next) {
//   const username = req.params.username;

//   User.findOne({ username: username }, function (err, user) {
//     if (err) {
//       return next(err);
//     }
//     if (user === null) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   });
// });

// find user by ID //in use
router.get('/api/users/:id', function(req, res, next) {
  var id = req.params.id;
  User.findById(id, function(err, User) {
      if (err) { return next(err); }
      if (User === null) {
          return res.status(404).json({'message': 'User not found!'});
      }
      res.json(User);
  });
});

  // User.findById(username, function(err, user) {
  //     if (err) { return next(err); }
  //     if (user === null) {
  //     return res.status(404).json({'message': 'User with specified Id cannot be found'});
  //     }
  //     res.json({'users': user});
  // });


// //  Deletes all the users
// router.delete("/api/users", function (req, res, next) {
//   User.deleteMany(function (err, users) {
//     if (err) {
//       return next(err);
//     }
//     if (users === null) {
//       return res.status(404).json({
//         message: "No registered users. Register users to delete them",
//       });
//     }
//     res.json({ users: users });
//   });
// });

// router.delete("/api/users/:username", function (req, res, next) {
//   const username = req.params.username;
//   User.findOneAndDelete(username, function (err, user) {
//     if (err) {
//       return next(err);
//     }
//     if (user === null) {
//       return res
//         .status(404)
//         .json({ message: "User with specified Id cannot be found" });
//     }
//     res.json({ users: user });
//   });
// });

//  Updates User with username using PUT (updates every singe aspect) //in use
router.put('/api/users/:id', (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(res => res.status(200).json(res))
  .catch(err => res.status(500).json(err));
});
// // check if need to be in use????
// //  Updates User with username using PATCH (updates only the specific aspect)
// router.patch("/api/users/:username", function (req, res, next) {
//   const username = req.params.username;
//   User.findOneAndUpdate(username, function (err, user) {
//     if (err) {
//       return next(err);
//     }
//     if (user === null) {
//       return res
//         .status(404)
//         .json({ message: "User with specified Id cannot be found" });
//     }
//     user.name = user.name || req.body.name;
//     user.email = user.email || req.body.email;
//     user.username = user.username || req.body.username;
//     user.password = user.password || req.body.password;

//     user.save;

//     res.json(user);
//   });
// });

//in use
router.post(
  "/api/users/:username/schedules", function (req, res, next) {
    console.log('asdasdasdasdadsd')
    const schedule = new Schedule(req.body)
    console.log(req.body)
    schedule.cells = {
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
    }
    const userId = req.params["username"]
    schedule.save()
    User.findByIdAndUpdate(userId, {$push : {schedule: schedule._id}}).then((result) => {
      return result.save()
    }).then(() => {
      res.status(201).json(schedule);
    }).catch((err) => {
			res.status(502).send();
			return next(err);
		});

  });

router.get( //in use
  "/api/users/:username/schedules/:name", function (req, res, next) {
    var userId = req.params["username"]
    var scheduleName = req.params["name"]

    User.findById(userId).populate("schedule").then((result) => {
      if (result === null) {
        console.log('null')
        res.status(404).send({ message: "The user_Id not found." });
        return;
      }
      const scheduleArray = result.schedule;
      var schedule;
      for(let i = 0; i < scheduleArray.length; i++ ) {
        if (scheduleArray[i].scheduleName === scheduleName) {
          schedule = scheduleArray[i]
        } 
      }
      res.json(schedule)
    }).catch((err) => {
      res.status(404).send({ message: "The schedule_Id not found." });
    return next(err);
    })
  });

router.delete( //in use
  "/api/users/:username/schedules/:id", function (req, res, next) {
  var userId = req.params["username"]
  var scheduleID = req.params["id"]

  //you should pass userID and scheduleId from the frontend
  User.findById(userId).populate("schedule").then((result) => {
    result.populate("schedule").execPopulate().then((result) => {
      const scheduleArray = result.schedule;
      var schedule;
      for(let i = 0; i < scheduleArray.length; i++ ) {
        if (scheduleArray[i]._id == scheduleID) {
          schedule = scheduleArray[i]
        } 
      }
      schedule.remove()
      res.json(schedule)
      // remove the schedule from the user
      User.findByIdAndUpdate(userId, {$pull : {schedule: schedule._id}}).then((result) => {
        return result.save()
      }).then(() => {
        res.status(201).json(schedule);
      }).catch((err) => {
        res.status(502).send();
        return next(err);
      });
    })
  })
});

router.delete( // finds the user delete their array of ID schedules // not connected to front end needed or class
  "/api/users/:username/schedules", function (req, res, next) {
  var userId = req.params["username"]

  //you should pass userID and scheduleId from the frontend
  User.findById(userId).populate("schedule").then((result) => {
    result.populate("schedule").execPopulate().then((result) => {
      const scheduleArray = result.schedule;
      var schedule;
      for(let i = 0; i < scheduleArray.length; i++ ) {
        schedule = scheduleArray[i]
        schedule.remove()
      }
      schedule.remove()
      res.json(schedule)
      // remove the schedule from the user
      User.findByIdAndUpdate(userId, {$set : {schedule: []}}).then((result) => {
        return result.save()
      }).then(() => {
        res.status(201).json(schedule);
      }).catch((err) => {
        res.status(502).send();
        return next(err);
      });
    })
  })
});

router.get( //findds a user and gets that user schedules IDs that were made by this user // not connected to front end needed or class
  "/api/users/:username/schedules", function (req, res, next) {
    var userId = req.params["username"]

    User.findById(userId).populate("schedule").then((result) => {
      if (result === null) {
        console.log('null')
        res.status(404).send({ message: "The user_Id not found." });
        return;
      }
      res.json(result.schedule)
    }).catch((err) => {
      res.status(404).send({ message: "The schedule_Id not found." });
    return next(err);
    })
  });
module.exports = router;

