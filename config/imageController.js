const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

//Multer Options
const multerOptions = {
  storage: multer.memoryStorage(),
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
  await photo.write(`./client/public/images/${req.body.image}`);
  next();
};
