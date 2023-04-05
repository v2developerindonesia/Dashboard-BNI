const db = require('../config/database')

db.user = require('./user.model')(db.sequelize, db.Sequelize)
db.category = require('./category.model')(db.sequelize, db.Sequelize)
db.video = require('./video.model')(db.sequelize, db.Sequelize)
db.image = require('./image.model')(db.sequelize, db.Sequelize)

//relasi

db.video.hasMany(db.image, {
  foreignKey: 'video_id',
})

db.video.belongsTo(db.user, {
  foreignKey: 'user_id',
})

db.category.hasMany(db.video, {
  foreignKey: 'kategori_id',
})

db.user.hasMany(db.video, {
  foreignKey: 'user_id',
})

module.exports = db
