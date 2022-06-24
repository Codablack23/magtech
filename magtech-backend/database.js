const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('magtech_db', 'user', 'password', {
    dialect: 'sqlite',
    host: './blogs.sqlite'
})

module.exports = sequelize