const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    userId :{
        type : String
    },
    oneTimeKey : {
        type : String 
    }
})

module.exports = mongoose.model('UserToken',otpSchema)