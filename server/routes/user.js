const express = require('express')
const { getAllUsers , registerUser , LoginUser , userProfile , userLogout , uploadImage} = require('../contollers/user')
const router = express.Router()

router.get('/' , getAllUsers)
router.post('/register' , registerUser)
router.post('/login' , LoginUser)
router.get('/profile' , userProfile)
router.post('/logout' , userLogout)
router.post('/upload-by-link' , uploadImage)

module.exports = router