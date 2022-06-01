const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send('Email has been verified , Now you can Login');
})

module.exports = router ;