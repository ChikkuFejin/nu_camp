const fs = require('fs');
const multer = require('multer');
const path = require('path');


// Assuming the file is coming in a request as 'file' field.

const rootFolder = 'public/uploads/';
// exports.fileupload=(req)=>{

// const file = req.files[0];
// console.log("🚀 ~ file: fileuploads.js:9 ~ file", file)
// const fileName = file.originalname;


// const webUrl = `${req.protocol}://${req.get('host')}`;
// photoPath = `${webUrl}/public/uploads/${fileName}`;

// // Save the file to local storage.
// fs.writeFile(path, file, (error) => {
//   if (error) {
//     return ({
//         status:false,
//         path:""
//     })

//   } else {

//     return ({
//         status:false,
//         path:photoPath
//     })
//     const fileUrl = `http://localhost:3000/uploads/${fileName}`;
//     res.send({ fileUrl });
//   }
// });

// }


exports. storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rootFolder) // directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // file name to be stored in the server
  }
})
