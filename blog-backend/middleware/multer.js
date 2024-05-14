const multer = require('multer')

// 1.destination 2.fileName  3.storage

const storage = multer.diskStorage({

  destination: function (request, file, cb)
   {
    cb(null, './images') // Destination folder for storing uploaded images
    console.log(file)
  },  

  filename: function (request, file, cb) {
    cb(null, file.originalname);  // Use the original filename for storing
  },

});

const upload = multer({ storage: storage });

module.exports = upload;

//npm install multer