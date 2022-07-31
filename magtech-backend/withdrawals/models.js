const {sequelize} = require ("../database")
const {Model,DataTypes} = require('sequelize')

class Withdrawal extends Model{}
class AccountDetails extends Model{}

Withdrawal.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
    },
    withdrawal_id:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
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

// account_name,
// account_type,
// account_number,
// bank,
// currency,
// firstname,
// lastname,
// email,
// country,
// routing_number,
// swift_code,
// address,
// street_name,
// street_no,
// postal_code,
// city,

AccountDetails.init({
    account_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    account_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    account_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    swift_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    routing_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
         type:DataTypes.STRING,
        allowNull:false
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    street_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    street_no:{
        type:DataTypes.STRING,
        allowNull:false
    },
    postal_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    bank_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{sequelize,tableName:"account_details"})
module.exports = {
    Withdrawal
}