const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId , required:true , ref:'Place'},
    user:{type:mongoose.Schema.Types.ObjectId , required:true},
    checkIn:{type:Date , required:true},
    checkOut:{type:String , required:true},
    numberOfGuests:{type:Number , reuired:true},
    name:{type:String , required:true},
    phone:{type:String , reuired:true}
})

module.exports = mongoose.models.Booking || mongoose.model('Booking' , bookingSchema)