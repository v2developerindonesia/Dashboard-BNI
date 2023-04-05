const db = require('../index')
const Category = db.category

exports.categorySeed = () => {
  //insert bulk create fungsi dari sequelize untuk mengimport banyak data
  Category.bulkCreate([
    {name: 'Ekspansi'},
    {name: 'Kemitraan Bisnis'},
    {name: 'Proteksi diri & Usaha'},
    {name: 'Persiapan Golden Age'},
    {name: 'Kembangkan Investasi'},
    {name: 'Rumah Idaman'},
    {name: 'Kendaraan Idaman'},
    {name: 'Pinjaman Personal'},
  ])
}