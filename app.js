// const express = require('express')
// const app = express()
// var path = require('path')
// const port = 4000
// const cors = require('cors')

// const Sequelize = require('sequelize')

// app.set('views', './views')
// app.set('view engine', 'ejs')

// app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));
// app.use(cors())

// app.get('/', (req, res) => {
// //   res.send('Hello World Engine!')
// res.render('table')
// })
// app.get('/:name', (req, res) => res.send(`Nama Saya : ${req.params.name}`))

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })

const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const __basedir = path.resolve()
const app = express()
const axios = require('axios')

dotenv.config()


let whitelist = ['http://localhost:4000']

//whitelistnya di cek
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.use(cors(corsOptions))
app.use(express.json())



//berfungsi untuk mengirimkan client ke server
app.use(express.urlencoded({
  extended: true
}))



app.use(express.static('storage'))
app.use('/video', express.static(__basedir + '/storage/upload'))


//terhubung ke database
const db = require('./src/models')
const seed = require('./src/models/seeds')



//untuk import ke database jika diperlukan, jika tidak bisa di comment
// db.sequelize.sync({ force: true})
// .then(() => {
//   seed.userSeed()
//   seed.categorySeed()
//   console.log(`database connected`)
// })
// .catch((err) => {
//   console.error(`database connection failed.`, err.message)
// })



//route halaman
require('./src/routes/auth.route')(app)
require('./src/routes/profile.route')(app)
require('./src/routes/video.route')(app)
require('./src/routes/upload.route')(app)


//route dashboard
app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/sb-admin-2', express.static(path.join(__dirname, 'asset/sb-admin-2')));

//fetch admin view dashboard
app.get('/', async(req, res) => {
  try {
    // const response = await axios.get('http://localhost:4000/api/video');
    // const data = response.data;
res.render('admin/view_dashboard')

 // Kirim tabel sebagai response
    res.send(tableHTML);
  } catch (error) {
    console.error(error);
    // res.status(500).send('Terjadi kesalahan pada server');
  }
  
})

//fetch data video with axios
app.get('/video', async(req, res) => {
  try {
    const response = await axios.get('http://localhost:4000/api/video');
    const data = response.data;
res.render('admin/video/view_video', { data })

 // Kirim tabel sebagai response
    res.send(tableHTML);
  } catch (error) {
    console.error(error);
    // res.status(500).send('Terjadi kesalahan pada server');
  }
  
})

//fetch data avatar with axios
// app.get('/', async(req, res) => {
//   try {
//     const response = await axios.get('http://localhost:4000/api/video');
//     const data = response.data;
// res.render('admin/avatar/table', { data })

//  // Kirim tabel sebagai response
//     res.send(tableHTML);
//   } catch (error) {
//     console.error(error);
//     // res.status(500).send('Terjadi kesalahan pada server');
//   }
  
// })

// app.get('/:name', (req, res) => res.send(`Nama Saya : ${req.params.name}`))


const PORT = process.env.APP_PORT || 4000

//console listen
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})

