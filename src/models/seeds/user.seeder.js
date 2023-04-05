const db = require('../index')
const User = db.user

exports.userSeed = () => {
  User.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '12345678'
  })
}