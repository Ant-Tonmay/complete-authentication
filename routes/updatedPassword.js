const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send('Password has been reset now you can log in');
})
module.exports = router