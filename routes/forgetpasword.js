const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../models/user');
const UserToken = require('../models/otp')
const Jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Joi = require('joi')
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tonmaysardar500@gmail.com',
        pass: process.env.AUTH_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

const emailFormatValidation = (data)=>{
    const schema =Joi.object({
        email : Joi.string().min(6).required().email()
    });

    return schema.validate(data)
};

router.get('/',(req,res)=>{
    res.render('forget-passowrd');

})

router.post('/',async(req,res)=>{
   
    // validating the User's Email
    const {error} = emailFormatValidation(req.body);
    if(error) return res.status(400).send('Kya Engineer Banega re tuu'+error.details[0].message);

    // Checking whether user id exists or not
    const validUser = await User.findOne({ email : req.body.email});
    // console.log(validUser);
    if(!validUser) return res.status(400).send('Excuse Me , That is a Wrong Email');
    
    if(validUser. isVerified ){
        const userToken = UserToken.findOne({userId:validUser._id});
        userToken.oneTimeKey = crypto.randomBytes(70).toString('hex');
        // const userToken = new UserToken({
        //     userId : validUser._id,
        //     oneTimeKey : crypto.randomBytes(64).toString('hex')
        // })

        // validUser.emailToken = crypto.randomBytes(50).toString('utf8');

        //creating a payload for craeating token 
        const payload = {
            id: validUser._id ,
            tokenId : userToken._id,
            oneTimeKey : userToken.oneTimeKey
        }
            // creating a token for oneTime access
        const onetime_key = Jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn:'5m'});

        let mailingDetails = {
            from: '"Team Xlet"<tonmaysardar500@gmail.com>',
            to: validUser.email,
            subject: "Reset Your Password",
            html: `<h1> Girl Friend ka number toh nhi Bhulta ! </h1>
                    <h2> Here's the Password reset link </h2>
                    <a href = "http://localhost:3000/reset-password?token=${onetime_key}">Reset Password</a>
                    `
        }
        // Sending Mail 
        transporter.sendMail(mailingDetails, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Mail has been sent to email account")
            }
        })
        
    } else {
        res.status(403).send('First Verify Your Account');
    }
})
module.exports = router;