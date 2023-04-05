const {isUserExist, isNameExist} = require('./register')
const { verifyToken } = require('./authJwt')

module.exports = {
  isUserExist,
  isNameExist,
  verifyToken
}