const {sequelize} = require ("../database")
const {Model,DataTypes} = require('sequelize')

class Withdrawal extends Model{}

Withdrawal.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
    },
    withdrawal_id:{
       type:DataTypes.UUIDV4,
       allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.BIGINT,
        defaultValue:0
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,tableName:"withdrawals"})

module.exports = {
    Withdrawal
}