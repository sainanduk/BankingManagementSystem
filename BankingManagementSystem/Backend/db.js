const mongoose = require("mongoose");
const { string, number } = require("zod");

mongoose.connect('mongodb://localhost:27017/Bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const userSchema = new mongoose.Schema({
    AccountNumber: {
        type: String,
        unique: true
    },

    customerid:{
        type:String
    },
    balance:{
        type:Number
    },

    fullName: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number
        
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: {
        type: Number
    },
    panNumber: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String
    },
    password: {
        type: String,
        minLength: 6
    }
    
    
});

const accountSchema = new mongoose.Schema({
    AccountNumber: {
        type: Number,
        required: true
    },
    
    Accountid:{
        
        type: String,
        required: true
    },

    customer_code:{

        type:String,
        required:true
      },
      customer_id:{
        type:Number,
        required:true
    
      }  
})


const admin=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);
const Admin=mongoose.model("admin",admin)

module.exports = {User, Account,Admin}