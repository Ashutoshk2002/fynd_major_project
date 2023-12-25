import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String, //for country code
        required:true
    },
    address:{
        type:{},
        required:true
    },
    prn_no:{
        type:String,
        required:true,
        unique:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

export default mongoose.model('users',userSchema);