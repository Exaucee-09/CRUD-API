const hash=require("../utils/hash")
const Joi=require('joi')
const bcrypt=require('bcrypt')
const {User,validate}=require("../model/user")
const routes=require("express").Router()
const jwt=require('jsonwebtoken')
const config=require('config')
const lodash=require('lodash')
require('dotenv').config()


routes.post('/signup',async (req,res)=>{
    try{
    
        const {error} = validate(req.body);
        console.log(error);
        if(error){ return res.send(error).status(400);}
        
        let newUser= await User.findOne({email: req.body.email });
        if(newUser){return res.send("user already registered").status(400)}
    
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password, salt)
    
        newUser=await new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            password:hashPassword
        })
    
        // const hashed= await hashPassword(newUser.password);
        // newUser.password=hashed;
        await newUser.save()
    
        
        res.redirect('/app/login')
    }catch(err){
        console.log(err);
        res.send("error signing up, reload the page"+err).status(400)
    }
    });

    module.exports=routes

