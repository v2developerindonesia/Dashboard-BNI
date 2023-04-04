const Sequelize = require("sequelize");
const db = require("../config/Database");

const {DataTypes} = Sequelize;

const Video = db.define('video', {
    name: DataTypes.STRING,
    file: DataTypes.STRING,
    ext: DataTypes.STRING,       
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Video;