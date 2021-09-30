const multer = require('multer');

const imageFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        cb('Please upload only image.', false);
    }
}

var storage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null, './public/img/uploads/');
    },
    filename: (req, file,cb) =>{
       cb(null, `${req.body.firstname}-${req.body.lastname}-${file.originalname}`);
    }
});

const uploadFile = multer({storage: storage, fileFilter: imageFilter});
module.exports = uploadFile;