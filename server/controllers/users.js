var express = require("express");
var router = express.Router();
var User = require("../models/user");
var schedule = require("../models/schedule");
const user = require("../models/user");

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

router.put('/api/users/:id', (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(res => res.status(200).json(res))
  .catch(err => res.status(500).json(err));
});
//  Updates User with username using PATCH (updates only the specific aspect)

router.patch("/api/users/:username", function (req, res, next) {
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
    var schedule = new Schedule(req.body);
    schedule.save(function (err, schedule) {
      if (err) {
        return next(err);
      }
      schedule.name

      user.save
      res.status(201).json(schedule);
    });
  });
module.exports = router;
