const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    Name:{type:String,required:true,unique:true},
    Surname:{type:String},
    password:{type:String},
    mobile:{type:Number},
    age:{type:Number}
})
const userModul=mongoose.model("user",userSchema)
module.exports=userModul
