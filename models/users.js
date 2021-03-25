const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name:{
        type : String,
        required :true
    },
    lastname:{
        type : String,
        required :true
    },
    addedDate:{
        type : Date,
        required : true,
        default: Date.now
    }

})

module.exports = mongoose.model('User',userSchema)