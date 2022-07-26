const {sequelize} = require("../database")
const {Model,DataTypes} = require("sequelize")


class Investment extends Model {}
class Bot extends Model{}
class Payment extends Model{}
class Refferals extends Model{}

Investment.init({
    id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        allowNull:false,

    },
    duration:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:90,
    },
    percentage_profit:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    returns:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    expires:{
        type:DataTypes.DATE,
        allowNull:false,
    }, 
    bot:{
        type:DataTypes.STRING,
        allowNull:false,
    }

},{sequelize,tableName:"investments"})

Bot.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    bot_id:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    bot_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    duration:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:90,
    },
    percentage_profit:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    expires:{
        type:DataTypes.DATE,
        allowNull:false,
    }, 
},{sequelize,tableName:"bots"})

Payment.init({
    id:{
     type:DataTypes.BIGINT,
     autoIncrement:true,
     primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    payment_id:{
       type:DataTypes.STRING,
       allowNull:false
    },
    status:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        defaultValue:0.00
    }
},{sequelize,tableName:"payments"})

Refferals.init({
    id:{
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.BIGINT
    },
    ref_code:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    first_gen:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    second_gen:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:0
    },
},{sequelize,tableName:"refferals"})
module.exports = {
    Investment,
    Bot,
    Payment,
    Refferals
}