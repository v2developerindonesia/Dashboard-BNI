const router = require('express')
const videoController = require('../controllers/VideoController')

router.get('/video', videoController.getVideos)

