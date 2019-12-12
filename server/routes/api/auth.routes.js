const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../../models/User");
const uploader = require('../../configs/cloudinary.configs')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  console.log("hola")
  const { username, password, picture } = req.body

  User.findOne({ username }, (err, foundUser) => {

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      gender:"",
      preference:"",
      quizValue: 0
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
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
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

//para pasar value del quiz al user...
router.post("/quiz", (req, res, next) => {
  const quizValue= req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      gender: quizValue.iam,
      preference: quizValue.lookingFor,
      quizValue: quizValue.averageQ,
    },
    { new: true }
  ).then(userUpdated => res.json(userUpdated));
});

module.exports = router;
