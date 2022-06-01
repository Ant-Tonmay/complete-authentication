const router = require('express').Router();
const bcrypt = require('bcryptjs');
const checkAsterisk = require('../utils/customValidation')
// const crypto = require('crypto');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser');
const {loginValidation} = require('../loginValidation');

const dotenv = require('dotenv');
const { redirect } = require('express/lib/response');
dotenv.config();

// const createToken = (id)=>{
//     return jwt.sign(id , process.env.ACCESS_TOKEN_SECRET);
// }

router.get('/',(req,res)=>{
    res.send("Please LOGIN");
})

router.post('/',async(req,res)=>{
   
    // validating the User's Data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({message:'Bhai yeh Kya kar tuu...'+error.details[0].message ,error:true});

    const isAsterisk = checkAsterisk(req.body.password);
    if(isAsterisk) return res.status(400).json({message:'Asterisk is not allowed in Password', error:true})

    // Checking whether user id exists or not
    const validUser = await User.findOne({ email : req.body.email});
    if(validUser===null) return res.status(400).json({message:'Yeh Shab Doglapan hain! .... Wrong Username or Password!',error:true});
    

    if(validUser. isVerified ){
    // Checking whether password is correct or not 
    const validPassword = await bcrypt.compare(req.body.password, validUser.password);
    if(!validPassword) return res.status(400).json({message:'Nalla hain kya ?... Wrong Password',error:true})
        
    //creating payload
    const payload = {
        id: validUser._id,
        isAdmin : validUser.admin
    }
    //Creating a Token
    const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET);
    // Storing token in cookie
    res.cookie('auth-token',token).json({message:'Reh Bhai Bhai ! Logged in',isAdmin:validUser.admin});
    } else {
        res.status(403).send('First Verify Your Account');
    }


})

module.exports = router ;