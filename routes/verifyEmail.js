const router = require('express').Router();
const User = require('../models/user');
const UserToken = require('../models/otp');

const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/',async(req,res)=>{
    try {
        const token = req.query.token
        const oneTime = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findOne({_id: oneTime.id})
        const onetimeUse = await UserToken.findOne({_id: oneTime.tokenId , userId:user._id})
        if(!user.isVerified){
            try {    
                    
                    onetimeUse.oneTimeKey = null
                    user.isVerified = true 
                    await user.save()
                    await onetimeUse.save()
                    res.redirect('/email-verfied');
        
            } catch (error) {
                res.redirect('/register')
                console.log(error)
            }
            
        }
        else{
            res.send('You Have already Verified')
        }
    } 
    catch (error) {
        console.log(error);
        res.status(401).send('Link Expired')
        
    } 
})

module.exports = router ; 