const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../../models/User");
const uploader = require('../../configs/cloudinary.configs')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// router.post('/signup', (req, res, next) => {
  // console.log(req.body.username)
  // console.log(req.body.password)
  // const { username, password } = req.body

  // if (!username || !password) {
  //   res.status(400).json({ message: 'Provide username and password' });
  //   return;
  // }

  // if (password.length < 2) {
  //   res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
  //   return;
  // }

  // User.findOne({ username }, (err, foundUser) => {

  //   if (err) {
  //     res.status(500).json({ message: "Username check went bad." });
  //     return;
  //   }

  //   if (foundUser) {
  //     res.status(400).json({ message: 'Username taken. Choose another one.' });
  //     return;
  //   }

  //   const salt = bcrypt.genSaltSync(bcryptSalt);
  //   const hashPass = bcrypt.hashSync(password, salt);

  //   const newUser = new User({
  //     username: username,
  //     password: hashPass
  //   });

  //   newUser.save(err => {
  //     if (err) {
  //       res.status(400).json({ message: 'Saving user to database went wrong.' });
  //       return;
  //     }

  //     // Automatically log in user after sign up
  //     // .login() here is actually predefined passport method
  //     req.login(newUser, (err) => {

  //       if (err) {
  //         res.status(500).json({ message: 'Login after signup went bad.' });
  //         return;
  //       }

  //       // Send the user's information to the frontend
  //       // We can use also: res.status(200).json(req.user);
  //       res.status(200).json(newUser);
  //     });
  //   });
//   // });
// });

router.post('/signup', (req, res, next) => {
  console.log("hola")
  const { username, password, picture } = req.body

  // if (!username || !password) {
  //   res.status(400).json({ message: 'Provide username and password' });
  //   return;
  // }

  // if (password.length < 2) {
  //   res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
  //   return;
  // }

  User.findOne({ username }, (err, foundUser) => {

    // if (err) {
    //   res.status(500).json({ message: "Username check went bad." });
    //   return;
    // }

    // if (foundUser) {
    //   res.status(400).json({ message: 'Username taken. Choose another one.' });
    //   return;
    // }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
    });

    console.log(newUser);
    User.create(newUser)
    .then(newUserCreated => console.log(newUserCreated))
    newUser.save(err => {
      // if (err) {
      //   res.status(400).json({ message: 'Saving user to database went wrong.' });
      //   return;
      // }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(newUser, (err) => {

        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(newUser);
      });
    });
  });
});


router.get("/hola",(req,res)=>{
  res.json({
    hola:"hpç"
  })
})

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


router.put("/quiz/:quizValue", (req, res, next) => {
  const { quizValue } = req.params;
  User.findByIdAndUpdate(
    req.params.quizValue,
    {
      quizValue: req.body.quizValue,
    },
    { new: true }
  ).then(userUpdated => res.json(userUpdated));
});

// router.post('/edit', (req, res) => {

//   const { name, description, inversions, length, park } = req.body

//   Coaster.findByIdAndUpdate(req.query.id, { name, description, inversions, length, park })
//     .then(() => res.redirect(`/coasters/${req.query.id}`))
//     .catch(err => console.log(err))
// })

module.exports = router;
