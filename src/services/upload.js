const multer = require('multer')
const util = require('util')
const path = require('path')
const __basedir = path.resolve()


//menentukan filtering
const imageFilter = (req, file, cb) => {
  if(file.mimetype.startsWith()) {
    cb(null, true)
  }else{
    cb('please upload only image.', false)
  }
}

//menentukan destinasi dan nama filenya
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/storage/upload')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})


//memasukkan kedalam fungsi uploadImage
const uploadImage = multer({
  storage: storage,
  // fileFilter: imageFilter
}).array('files')


//proses async await (promisify dari utility)
let uploadFile = util.promisify(uploadImage)

module.exports = {
  uploadFile,
  __basedir,
}