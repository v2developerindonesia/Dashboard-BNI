const express = require('express')
const app = express()
var path = require('path')
const port = 4000
const cors = require('cors')

const Sequelize = require('sequelize')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));
app.use(cors())

app.get('/', (req, res) => {
//   res.send('Hello World Engine!')
res.render('table')
})
app.get('/:name', (req, res) => res.send(`Nama Saya : ${req.params.name}`))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})