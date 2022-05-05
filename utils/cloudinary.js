const cloudinary = require('cloudinary')
const keys = require('../config/keys')

cloudinary.config({
    cloud_name: keys.CLOUDINARY.NAME,
    api_key: keys.CLOUDINARY.API_KEY,
    api_secret: keys.CLOUDINARY.SECRET
})



module.exports = cloudinary;