const fs = require('fs')


const IsFileExistsInPath=(path)=>{
    if (fs.existsSync(path)) {
        console.log('File exists',path);
        return true
      } else {
        console.error('File does not exist',path);
        return false
      }
      
}

exports.getImageSorcePath=(path)=>{
    let p=path.split('/')
    return p?.slice(1,p.length+1).join("/")
}

exports. updatePhoto=(oldPhotoPath)=> {
    if(IsFileExistsInPath(oldPhotoPath)){

        fs.unlinkSync(oldPhotoPath); // delete the old photo
        // fs.renameSync(newPhotoPath, oldPhotoPath); // rename the new photo with the old file name
    }else{
        console.log("file not exits");
    }
 
}

