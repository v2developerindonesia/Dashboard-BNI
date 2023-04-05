// const Sequelize = require("sequelize");
// const db = require("../config/Database");

// const {DataTypes} = Sequelize;

// const Video = db.define('video', {
//     name: DataTypes.STRING,
//     file: DataTypes.STRING,
//     ext: DataTypes.STRING,       
//     url: DataTypes.STRING
// },{
//     freezeTableName: true
// });

// module.exports = Video;

module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define('videos', {
      user_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      
  
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
     
     
    })
  
    return Video
  }