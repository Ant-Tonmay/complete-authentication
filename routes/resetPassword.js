const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserToken = require('../models/otp');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
require('dotenv').config();


const passwordFormatValidation = (data)=> {
    const schema = Joi.object ({
        password : Joi.string().min(8).required()
    });
    return schema.validate(data);

}

router.get('/',(req , res)=>{
    res.send('Create Your New Password');
})

router.post('/',async(req , res)=>{

        // Check if the given Password is in wrong Format
    const {error} = passwordFormatValidation(req.body);
    if(error) return res.status(400).send('Kya Enginner Banega re tuu'+error.details[0]);


    try {
        
          const token = req.query.token; //id , tokenId , OneTimeKey 
          const oneTime = jwt.sign(token , process.env.ACCESS_TOKEN_SECRET)
          const user = await User.findOne({_id:oneTime._id})
          const oneTimeUse = await UserToken.findOne({_id:oneTime.tokenId, userId:user._id})

                // User can reset Their password for once with a one link

          if(oneTime.oneTimeKey===oneTimeUse.oneTimeKey)
          {
            try {  
                    // make this null so that it works for oneTime
                  oneTimeUse.emailToken = null
                 //Hashing the Updated Password
                  const salt = await bcrypt.genSalt(10);
                  const hashedPassword = await bcrypt.hash(req.body.password, salt);
                //Now the Store the new password
                  user.password = hashedPassword;
                  await user.save();
                  await oneTimeUse.save();
                  res.redirect('/updated-password');
   
               } catch (error) {
                    res.send('Failed to Reset Password');
                    console.log(error);
                }
          } else{
                res.send('You Have Already Reset');
               }

    } catch (error) {
        res.status(401).send('Link Expired');
    }
    
})

module.exports = router ;