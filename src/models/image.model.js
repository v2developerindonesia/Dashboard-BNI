module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define('images', {
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  
    return Image
  }