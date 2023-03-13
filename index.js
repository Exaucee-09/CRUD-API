const express= require('express')
const bodyParser= require("body-parser")
const path=require("path")
const config=require("config")
const connectToDB=require('./model/db')
const authorization=require('./controllers/authorize')
const authentication=require('./controllers/authentication')
const navigation=require('./controllers/navigation')
const students=require('./controllers/studentS')
const swagger=require('./swagger')
const swaggerUi=require('swagger-ui-express')
const swaggerJsDoc=require('swagger-jsdoc')
const {annotations}=require('./swagger')

require('dotenv').config()

//to connect to database
connectToDB()

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.set(path.join(__dirname,"views"))
app.use(express.static(__dirname+'/views'))

app.get("/",(req,res)=>{
    res.send("IT WORKED OUT MHN")
});

app.use('/app',authentication)
app.use('/app',authorization)
app.use('/app',navigation)
app.use('/app',students)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(annotations))

app.listen(5000,()=>{
 console.log("server listening on port 5000");
})