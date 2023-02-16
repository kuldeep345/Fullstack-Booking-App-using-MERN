const User = require('../models/User')
const Place = require('../models/Place')
const Booking = require('../models/Booking')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const download = require('image-downloader')
const path = require('path')
const fs = require('fs')

exports.getAllUsers = async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.registerUser = async(req,res)=>{
    try {
        const { name , email , password } = req.body
        const salt = bcrypt.genSaltSync(10)
        const user = await new User({
            name,
            email,
            password:bcrypt.hashSync(password , salt)
        })

       const savedUser = await user.save()
       res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.LoginUser = async(req,res)=>{
    const { email , password } = req.body;
    const userDoc = await User.findOne({email})

    if(userDoc){
        const ispass = bcrypt.compareSync(password , userDoc.password)
        if(ispass){
            jwt.sign({email:userDoc.email , id:userDoc._id , name:userDoc.name } , process.env.JWT_SECRET , {} , (err,token)=>{
                if(err) throw err;
                res.cookie('token' , token).status(200).json(userDoc)
            })

        }
        else{
            res.status(422).json("Invalid credentails")
        }
    }   
    else{
        res.status(400).json("Invalid credentails")
    }
}


exports.userProfile = async(req,res)=>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token , process.env.JWT_SECRET , {} , async(err , user)=>{
            if(err) throw err;
            const {name ,email , _id} = await User.findById(user.id)
            res.json({name ,email , _id})
        })
    }else{
        res.json(null)
    }
    
}

exports.userLogout = async(req,res)=>{
    res.cookie('token' , '').json(true);
}

exports.uploadImage = async(req,res)=>{
    const { link } = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    await download.image({
       url:link,
         dest: path.join(__dirname , `../uploads/${newName}`)
    })
    res.json(newName)
}

exports.uploadPhoto = async(req,res)=>{
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++){
        const {path , originalname} = req.files[i]
       const parts = originalname.split('.')
       const ext = parts[parts.length - 1]
       const newPath = path + '.' + ext;
       fs.renameSync(path , newPath)
       uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
  res.json(uploadedFiles)
}

exports.addNewPlace = async(req,res)=>{
    try {
    const { token } = req.cookies;
    const { title , address , addedPhotos , description , perks , extraInfo , checkIn , checkOut , maxGuests, price } = req.body
    await jwt.verify(token , process.env.JWT_SECRET , {} , async(err , userData) => {
        const place = await new Place({
            owner:userData.id,
            title,
            address, 
            photos:addedPhotos,
            description, 
            perks, 
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })

        const newPlace = await place.save()
        res.status(201).json(newPlace)
    })
    } catch (error) {
         res.status(500).json({error:error.message})
    }
}

exports.getAllPlaces = async(req,res)=>{
    try {
    const { token } = req.cookies
    jwt.verify(token , process.env.JWT_SECRET , {} , async(err,userData) => {
        const { id } = userData;
        const places = await Place.find({owner:id})
        res.status(200).json(places)
    })        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.getHotelDetails = async(req,res)=>{
    try {
        const { id } = req.params
        const hotel = await Place.findById(id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


exports.updateHotel = async(req,res)=>{
    try {
     const {token} = req.cookies;
     const {id, title , address , addedPhotos , description , perks , extraInfo , checkIn , checkOut , price , maxGuests } = req.body;
     jwt.verify(token , process.env.JWT_SECRET , {} , async(error , userData) =>{
        const placeDoc = await Place.findById(id)
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title , address , addedPhotos , description , perks , extraInfo , checkIn , checkOut , price , maxGuests
            })
            const updatedhotel = await placeDoc.save()
            res.status(200).json(updatedhotel)
        }
     })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.AllPlaces = async(req,res)=>{
    try {
        const allplaces = await Place.find()
        res.status(200).json(allplaces)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
function getUserDataFromToken(req){
    return new Promise((resolve , reject) => {
        jwt.verify(req.cookies.token , process.env.JWT_SECRET , {} , async(err , userData)=>{
            if(err) throw err;
            resolve(userData)
        })
    })
}

exports.booking = async(req,res)=>{
    const userData = await getUserDataFromToken(req)
    const { place , checkIn , checkOut , numberOfGuests, name , phone } = req.body
    await Booking.create({
        place , user:userData.id , checkIn , checkOut , numberOfGuests, name , phone
    }).then((doc) => {
        res.json(doc)
    }).catch((err)=>{
        throw err;
    })
}

exports.bookings = async(req,res)=>{
    const userData = await getUserDataFromToken(req)
    console.log(userData)
    const bookings = await Booking.find({user:userData.id}).populate('place')
    res.status(200).json(bookings)
}