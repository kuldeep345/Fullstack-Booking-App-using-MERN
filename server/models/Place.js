const mongoose = require("mongoose")

const PlaceSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    price:Number,
    maxGuests:Number
})

module.exports = mongoose.models.Place || mongoose.model('Place' , PlaceSchema)