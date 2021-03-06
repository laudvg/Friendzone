const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../../models/User");
const uploader = require('../../configs/cloudinary.configs')
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username }, (err, foundUser) => {

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      gender:"",
      preference:"",
      quizValue: 0, 
      description:""
    });

    User.create(newUser)
    .then(newUserCreated => console.log(newUserCreated))
    newUser.save(err => {
      req.login(newUser, (err) => {

        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }
        // Send the user's information to the frontend
        res.status(200).json(newUser);
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      next(new Error("couldnt log in"))
    }

    if (!theUser) {
      next(failureDetails)
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        next(new Error("Session save went bad.'"))
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

router.post('/upload', uploader.single('picture'), (req, res) => {
  if(req.file){
    res.status(200).json({secure_url: req.file.secure_url })
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
})

router.post("/quiz", (req, res, next) => {
  const quizValue = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      gender: quizValue.iam,
      preference: quizValue.lookingFor,
      quizValue: quizValue.averageQ,
      description: quizValue.description
    },
    { new: true }
  ).then(userUpdated => res.json(userUpdated));
});


router.get('/matches', (req, res, next) => {
  if (req.isAuthenticated()) {
    let numberMin = Math.floor(req.user.quizValue)
    let numberMax = Math.ceil(req.user.quizValue)
    if (numberMax === numberMin){
      if (numberMin > 1){
        numberMin--;
      } else {
        numberMax++;
      } 
    }
    User.find({$and:[ {quizValue:{$gte:numberMin}}, {quizValue:{$lte:numberMax}} , {username:{$not:{ $eq: req.user.username}}} ]})
    .then(userFound=>res.json(userFound))
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
})

router.get("/:user", (req, res, next) => {
  User.findOne({username: req.params.user})
  .then(oneUser=>{
    res.status(200).json({oneUser})
  })
  .catch(error => res.status(500).json({ message: 'Something went wrong' }))
})

module.exports = router;
