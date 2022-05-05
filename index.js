const express = require('express')
const path = require('path')
const Data = require('./models/Data')
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose')
const keys = require("./config/keys");
const upload = require('./utils/multer')
const multer = require("multer");
const cloudinary = require('./utils/cloudinary')
const PORT = process.env.PORT || 5000;



mongoose.connect(
  keys.mongodb.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => res.render('pages/index'))


  
app.post("/upload", upload.single("avatar"), async (req, res) => {
  try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result)
      console.log( req.body )
      // Create new user
      Data.create( {
      fullname: req.body.fullname,
      birthday: req.body.birthday,
      id_number: req.body.id_number,
      region: req.body.region,
      province : req.body.province,
      city: req.body.city,
      barangay: req.body.barangay,
      cloudinary_id: result.public_id,
      photo: result.secure_url,
    })
    .then( () => {
      res.redirect('/success')
    })
    .catch( err => console.log(err))
     
  } catch (err) {
    console.log(err)    }
});


app.get('/success', (req, res) => {
  res.render('pages/success')
})

app.get('/view', (req,res) => {
  Data.find({})
  .then( (data) => {
    // console.log(data)
     res.render('pages/view', { data })
  })
  .catch( err => console.log(err))
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
