const router = require('express').Router()
const passport = require('passport')
const session = require('express-session')
const jwt = require('jsonwebtoken')


router.use(session({secret:'My secret'}));
router.use(passport.initialize())
router.use(passport.session())

router.get('/', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const payload = {
      id: req.user._id,
      isAdmin: req.user.admin
    }
    const token = jwt.sign(payload ,process.env.ACCESS_TOKEN_SECRET)

    res.cookie('auth-token',token).json({message:'Reh Bhai Bhai ! Logged in',isAdmin:req.user.admin});
    console.log('call back')
  });



   
module.exports = router
        