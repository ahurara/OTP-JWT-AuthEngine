import mongoose, { Types } from 'mongoose';

export const UserSchema =new mongoose.Schema({
    username : {
        type :String,
        required: [true ,"Please enter unique username"],
        unique :[true , 'Username exist']
    },
    password : {
        type : String,
        required :[true , 'Please rpovide a password'],
        unique:false,
    },
    email : {
        type : String,
        required : [true ,"please provide a unique email"],
        unique :true 
    },
    firstName :{type : String}, 
    lastName :{type : String},
    mobile :{type : Number}, 
    address :{type : String}, 
    profile :{type : String},

})

//mongodb specify plural names thats why name of model if exist would be Users
export default mongoose.model.Users || mongoose.model('User' , UserSchema); 