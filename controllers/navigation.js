const { User, validate}= require("../model/user")
const routes=require("express").Router()
const hashPassword= require("../utils/hash")
const Student=require("../model/student")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const config=require('config')
const authToken=require('./validateToken')

routes.get('/signup', (req,res)=>{
  res.render('signup')
})

routes.get('/login',(req, res)=>{
  res.render('login')
})

routes.get('/create', (req, res) => {
    res.render('create');
 });
  
  

  

 
  
  





module.exports=routes;