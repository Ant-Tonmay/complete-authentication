const router = require('express').Router()
const verify = require('../authenticateToken')



router.get('/', verify, (req,res)=>{
    res.send('Dashboard')
})

module.exports = router;