const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');
const jimp = require('jimp');
const uuid = require('uuid');
const clientID = require('./keys').clientID;

//Multer Options
const multerOptions = {
  storage: ImgurStorage({ clientId: clientID }),
  fileFilter: (req, file, cb) => {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      cb(null, true);
    } else {
      req.fileValidationError = 'You must upload a valid image';
      return cb(null, false, req.fileValidationError);
    }
  }
};

exports.upload = multer(multerOptions).single('recipe-image');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  next();
};
