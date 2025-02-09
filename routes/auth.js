const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

router.get('/register', (req, res) => {
    res.render('register');
});

  
//Sign up
router.post("/register", (req, res, next)=>{
    // Getting the user from body
    const username = req.body.username;
    const password = req.body.password;

    //password should be over 4 characters
    if (password.length < 4) {
         res.render('register', { message: 'Your password has to be 4 chars min' });
         return;
    }

    User.findOne({ username }).then((userFromDB) => {

        // Check if your username was taken buy someone else
        if (userFromDB !== null) {
            res.render('register', { message: 'Your username is already taken' });
            return;
          } else {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);
            User.create({
              username: username,
              password: hash,
            })
              .then((createdUser) => {
                console.log(createdUser);
                res.redirect('/login');
              })
              .catch((err) => {
                next(err);
              });
          }
      });

 
});

// Login
router.post("/login", (req, res, next) => {
    const  username  = req.body.username;
    const  password  = req.body.password;

    User.findOne({ username: username }).then((dataUser) => {
        if (!dataUser) {
            res.render('login', { message: 'Invalid Credentials' });
            return;
        } else if (bcrypt.compareSync(password, dataUser.password)){
            console.log('this is user:', dataUser);
            req.session.user = dataUser;
            res.redirect('/');
        } else {
            res.render('login', { message: 'Invalid Crentials' });
        }
     

});
})

router.get('/login', (req, res) => {
    res.render('login');
});



// Log-out
router.get('/logout', (req, res, next) => {
    req.session.destroy();
    console.log('destroy');
    res.redirect('/');
  });


module.exports = router;