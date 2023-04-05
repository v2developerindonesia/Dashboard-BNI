module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('categorys', {
      name: {
        type: Sequelize.STRING,
        allowNul: false
      },
    })
  
    return Category
  }