const express = require('express')
const { getAllUsers , registerUser , LoginUser , userProfile , userLogout } = require('../contollers/user')
const router = express.Router()

router.get('/' , getAllUsers)
router.post('/register' , registerUser)
router.post('/login' , LoginUser)
router.get('/profile' , userProfile)
router.post('/logout' , userLogout)

module.exports = router