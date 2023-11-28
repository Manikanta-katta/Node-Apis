const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserData = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    }
})

const UsersData = mongoose.model("userData",UserData)

module.exports = UsersData;