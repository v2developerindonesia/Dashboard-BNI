const db = require('../models')
const User = db.user


//jika email sudah ada atau terdaftar di table user
const isUserExist = (req, res, next) => {
  User.findOne({
    where: {
     
      email: req.body.email,
     

    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: 'this email is already exists!'
      })
      return
    }
    next()
  })
}




//jika nama sudah ada atau terdaftar di table user
const isNameExist = (req, res, next) => {
  User.findOne({
    where: {
     
      name: req.body.name,
     

    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: 'this name is already exists!'
      })
      return
    }
    next()
  })
}



module.exports = {
  isUserExist,
  isNameExist,
 
}