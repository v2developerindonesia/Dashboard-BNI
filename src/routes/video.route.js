// const router = require('express')
// const videoController = require('../controllers/VideoController')

// router.get('/video', videoController.getVideos)

const middleware = require('../middleware')
const controller = require('../controllers/video.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/video',controller.index)
  app.post('/api/video', controller.create)
  app.get('/api/video/:id', controller.show)
  app.patch('/api/video/:id', middleware.verifyToken, controller.update)
  app.delete('/api/video/:id', middleware.verifyToken, controller.delete)
}