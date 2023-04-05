// const Video = require("../models/VideoModel");
// const path = require("path");
// const fs = require("fs");

// export const getVideos = async(req, res) => {
//     try {
//         const video = await Video.findAll();
//         res.status(200).json(videos);
//         res.render("table", {
//             title: "BNI | Video",
//             video,
//         })
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const getVideoById = async(req, res) => {
//     try {
//         const response = await Video.findOne({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

const db = require('../models')
const { getPagination, getPagingData } = require('../services/pagination')
const Video = db.video
const Image = db.image

//mendapatkan semua data sesuai dengan author yang memiliki produk, jika tidak memiliki produk maka di tampilkan array NULL
exports.index = async (req, res) => {
  const {page, size} = req.query
  const {limit, offset} = getPagination(page, size)
  // const videos = await Video.find();

  Video.findAndCountAll({
   
    limit,
    offset,
    include: Image,
  
  }).then((result) => {
    const response = getPagingData(result, page, limit)
    res.status(200).json({
      ...response,
      message: 'show all video successfully!'
    })
    // res.render("table", {
    //   nama,
    //   videos,
    //   pagination: response.pagination
    // })
    // console.log(videos)
    
  }).catch((err) => {
    res.status(500).json({
      
      message: err.message
    })
  })
}



//menambah produk
exports.create = (req, res) => {
  if(!req.body.nama){
    res.status(400).json({
      message: 'name product must be required!'
    })
    return
  }

  const video = {
    user_id: req.userId,
    ...req.body
  }

  Video.create(video).then((result) => {
    res.status(201).json({
      data: result,
      message: 'Video create successfully!'
    })
  }).catch((err) => {
    res.status(500).json({
      data: result,
      message: err.message
    })
  })
}


//menampilkan single data produk berdasarkan params ID dan Token Pemilik yang memiliki data produk
exports.show = (req, res) => {
  const id = req.params.id

  Video.findByPk(id, {
    include: Image,
  })
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({
          message: 'unauthorized data product',
        })
        return
      }

      res.status(200).json({
        data: result,
        message: 'show product success',
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}


//update produk harus sesuai dengan author token
exports.update = (req, res) => {
  const id = req.params.id

  Video.findByPk(id)
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({
          message: 'unauthorized data video',
        })
        return
      }

      Video.update(req.body, {
        where: {
          id: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            res.status(200).json({
              message: 'video updated successfully',
            })
          } else {
            res.status(400).json({
              message: `cannot update video with id ${id}`,
            })
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          })
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}


//hapus produk
exports.delete = (req, res) => {
  const id = req.params.id

  Video.findByPk(id)
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({
          message: 'unauthorized data video',
        })
        return
      }

      Video.destroy({
        where: {
          id: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            res.status(200).json({
              message: 'video deleted successfully',
            })
          } else {
            res.status(400).json({
              message: `cannot delete video with id ${id}`,
            })
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          })
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}