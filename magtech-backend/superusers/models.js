const {sequelize} = require("../database.js")
const {Model,DataTypes} = require("sequelize")

class Admin extends Model{}

Admin.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    admin_id:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    isSuperUser:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{sequelize,tableName:"admins"})


module.exports = {
    Admin
}