const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    fullname: String,
    birthday: String,
    id_number: String,
    region: String,
    province : String,
    city: String,
    barangay: String,
    cloudinary_id: String,
    photo: String,
    
});

const Data = mongoose.model("user", dataSchema);
module.exports = Data;
