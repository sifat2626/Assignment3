//Basic
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

//security middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//database
const mongoose = require("mongoose");

//security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//body-parser implement
app.use(bodyParser.json());

//request rate limit
const limiter = rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);

//mongodb database connection
let uri = "mongodb://127.0.0.1:27017/Todo";
let option = {user:"",pass:"",autoIndex:true};
mongoose.connect(uri,option,(error)=>{
   if(error)
   {
       console.log(error);
   }
   else
   {
       console.log("Connection Success!!");
   }
});

//routing implementation
app.use("/api/v1",router);

//undefined route implement
app.use("*",(req,res)=>{
   res.status(404).json({status:"fail",data:"Not found"});
});


module.exports = app;

