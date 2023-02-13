const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    email:{ type:String , unique:true },
    password:String
})

module.exports = mongoose.models.UserSchema || mongoose.model('User' , UserSchema)