var jwt = require("jsonwebtoken");




module.exports = (req,res,next)=>{
  let token = req.headers['token-key'];

  jwt.verify(token,'SecretKey123456789',(error,decoded)=>{
      if(error)
      {
          res.status(401).json({status:"unauthorized"});
      }
      else
      {
          //get username from decoded token & add with request header
          let username = decoded["data"]["Username"];
          req.headers.username = username;
          next();
      }
  })
};