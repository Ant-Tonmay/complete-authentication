const jwt = require('jsonwebtoken')

module.exports =function (req,res,next){
    const token = req.cookies['auth-token'];
    if(!token) return res.status(401).send('Access Denied');
     
    try {
        const verified = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        console.log(verified._id)
        console.log(verified)
        next();
    } catch (error) {
           res.status(404).send('Invalid Token').redirect('/login')
           
    }
}