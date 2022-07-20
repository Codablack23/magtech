const {Sequelize} = require("sequelize")
const dotenv = require("dotenv").config()

const dbConfig = {
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    db:process.env.DB_NAME,
    environment:process.env.ENV
}
const sequelize_session= new Sequelize('magtech_db', 'user', 'password', {
    dialect: 'sqlite',
    host: './sessions.sqlite'
})

const db = (dbConfig.environment === "production"?{
    dialect: 'sqlite',
    host: './magtech.sqlite'
}:
{
    dialect:"mysql",
    host:"localhost"
});

const sequelize = new Sequelize('magtech',dbConfig.user,dbConfig.password,db)

module.exports ={ 
 sequelize_session,
 sequelize,
}