const express = require("express");
const router = express.Router();
const User = require("../models/user");                                                                      
const Schedule = require("../models/schedule");
//// const user = require("../models/user");

//  Creates a user
router.post("/api/users", function (req, res, next) {
  var user = new User(req.body);
  user.save(function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(201).json(user);
  });
});

//  Gets all users
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

router.get("/api/users/:username", function (req, res, next) {
  const username = req.params.username;

  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  // User.findById(username, function(err, user) {
  //     if (err) { return next(err); }
  //     if (user === null) {
  //     return res.status(404).json({'message': 'User with specified Id cannot be found'});
  //     }
  //     res.json({'users': user});
  // });
});

//  Deletes all the users
router.delete("/api/users", function (req, res, next) {
  User.deleteMany(function (err, users) {
    if (err) {
      return next(err);
    }
    if (users === null) {
      return res.status(404).json({
        message: "No registered users. Register users to delete them",
      });
    }
    res.json({ users: users });
  });
});

router.delete("/api/users/:username", function (req, res, next) {
  const username = req.params.username;
  User.findOneAndDelete(username, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res
        .status(404)
        .json({ message: "User with specified Id cannot be found" });
    }
    res.json({ users: user });
  });
});

//  Updates User with username using PUT (updates every singe aspect)
router.put("/api/users/:username", function (req, res, next) {
  const username = req.params.username;
  User.findOneAndReplace(username, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res
        .status(404)
        .json({ message: "User with specified Id cannot be found" });
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save;

    res.json(user);
  });
});

//  Updates User with username using PATCH (updates only the specific aspect)

router.put("/api/users/:username", function (req, res, next) {
  const username = req.params.username;
  User.findOneAndUpdate(username, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res
        .status(404)
        .json({ message: "User with specified Id cannot be found" });
    }
    user.name = user.name || req.body.name;
    user.email = user.email || req.body.email;
    user.username = user.username || req.body.username;
    user.password = user.password || req.body.password;

    user.save;

    res.json(user);
  });
});

router.post(
  "/api/users/:username/schedules", function (req, res, next) {
    const schedule = new Schedule(req.body)
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

  router.get(
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
module.exports = router;

