const passport = require('passport');
const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const session = require('express-session');
const { redirect } = require('express/lib/response');

require('dotenv').config();

passport.serializeUser((user,done)=>{
  done(null , user.id)
})

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null , user)
  })
})


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3005/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log("Acessing Google Account")
    let user = await User.findOne({googleId: profile.id})
        if (user) {
          done(null ,user)
        }
        else{ 
         const Savinguser = new User({
           googleId : profile.id,
           name:profile.displayName,
           email:profile.email,
           isVerified:true
         })
         user = await User.create(Savinguser)
        }
       return done(null, user);
  }
));




router.get('/',(req,res)=>{
res.send('<a href="/google">Signup With google')
})




        

module.exports = router


