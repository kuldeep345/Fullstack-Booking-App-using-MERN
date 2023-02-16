const express = require('express')
const { getAllUsers , registerUser , LoginUser , userProfile , userLogout , uploadImage, uploadPhoto, addNewPlace, getAllPlaces, getHotelDetails, updateHotel, AllPlaces ,booking , bookings} = require('../contollers/user')
const router = express.Router()
const multer = require('multer')

const photoMiddleware = multer({dest:'uploads'})

router.get('/' , getAllUsers)
router.post('/register' , registerUser)
router.post('/login' , LoginUser)
router.get('/profile' , userProfile)
router.post('/logout' , userLogout)
router.post('/upload-by-link' , uploadImage)
router.post('/upload' , photoMiddleware.array('photos' , 100) , uploadPhoto)
router.route('/places').post(addNewPlace).get(getAllPlaces).put(updateHotel)
router.get('/places/:id' , getHotelDetails)
router.get('/allplaces' , AllPlaces)
router.post('/booking' , booking)
router.get('/bookings' , bookings)

module.exports = router