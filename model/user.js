const mongoose=require("mongoose")
const Joi=require("joi")
const jwt= require('jsonwebtoken')
require('dotenv').config()
// const config=require('config')

const userSchema= new mongoose.Schema({
    firstname:{type: String, required:true, maxlength: 100, minlength: 3},
    lastname:{type: String, required:true, maxlength: 100, minlength: 3},
    email:{type: String, required:true, unique:true, maxlength: 100, minlength: 3},
    phone:{type: String, required:true, unique:true, maxlength: 15, minlength: 10},
    password:{type: String, required:true}
})

const User= mongoose.model('User', userSchema)

// userSchema.methods.generateToken= ()=>{
//     const token= jwt.sign({email:this.email},process.env.JWT,{
//         expiresIn:"1m",
//     })
//     return token
// }

const validate=(user)=>{
    const schema=Joi.object({
    firstname: Joi.string().max(100).min(3).required(),
    lastname:Joi.string().max(100).min(3).required(),
    email:Joi.string().max(100).min(3).required().email(),
    phone:Joi.string().max(15).min(10).required(), 
    password:Joi.required(),
    })
    return schema.validate(user)
}

module.exports={User,validate}