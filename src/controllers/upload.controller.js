//untuk menghapus file dengan file system
const fs = require('fs')
const  {uploadFile, __basedir} = require('../services/upload')
const db = require('../models')

const Image = db.image


exports.upload = async (req, res)=> {
  const id = req.params.id
  try {
    await uploadFile(req, res)

    if(req.files == undefined) {
      return res.status(400).json({
        message: 'please upload a file'
      })
    }
    let images = req.files.map((item) => {
      const image = {}
      image.video_id = id,
      image.file = item.filename
      return image
    })
    Image.bulkCreate(images).then((result) => {
      res.status(201).json({
        message: 'upload files successfully'
      })
    }).catch((err) => {
      res.status(500).send({
      message: 'Uploaded files failed'
    })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error,
    })
  }
}


exports.remove = (req, res) => {
  const id = req.params.id
  Image.findByPk(id)
  .then((data) => {
    fs.unlink(
      __basedir + `/storage/upload/${data.file}`,
      function(err) {
        if(err){
          throw res.status(500).json({
            message: 'delete image failed!',
          })
        }

        Image.destroy({
          where: {
            id: id
          }
        })
        .then((num) => {
          if(num == 1) {
            res.status(200).json({
              message: 'Image was deleted successfully'
            })
          }else{
            res.status(500).json({
              message: `Cannot delete Tutorial with id=${id}`
            })
          }

        })
        .catch((err) => {
          res.status(500).json({
              message: err.message
            })
        })
      }

    )
  }).catch((err) => {
    res.status(500).json({
              message: err.message
            })
  })
}