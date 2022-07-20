const {sequelize} = require("../database")
const {Model,DataTypes} = require('sequelize')

class User extends Model{}

User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.TEXT,
    },
    email:{
        type:DataTypes.STRING,
    },
    phone_no:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    ref_code:{
        type:DataTypes.STRING, 
        unique:true
    },
    password:{
        type:DataTypes.STRING,
    },
    reffered:{
        type:DataTypes.BOOLEAN,
    },
    ref:{
        type:DataTypes.TEXT,
        defaultValue:""
    }
},{sequelize,tableName:"users"})



module.exports ={
    User
}