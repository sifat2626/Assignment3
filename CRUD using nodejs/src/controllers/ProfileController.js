const profileModel = require("../models/ProfileModel");
var jwt = require("jsonwebtoken");
exports.CreateProfile = (req,res)=>{
    let reqBody = req.body;
    profileModel.create(reqBody,(err,data)=>{
        if(err)
        {
            res.status(400).json({status:"fail",data:err});
        }
        else
        {
            res.status(200).json({status:"success",data:data});
        }
    })
};
exports.UserLogin = (req,res)=>{
    let reqBody = req.body;
    let userName = reqBody["Username"];
    let password = reqBody["Password"];
    profileModel.find({Username: userName,Password:password},(error,data)=>{
        if(error)
        {
            res.status(401).json({status:"unauthorized"});
        }
        else
        {
            if(data.length>0)
            {
                //Create auth token
                let payload = {
                    exp: Math.floor(Date.now()/1000)+(24*60*60),
                    data:data[0]
                };
                let token = jwt.sign(payload,'SecretKey123456789');

                res.status(200).json({status:"success",token:token,data:data[0]});

            }
            else
            {
                res.status(401).json({status:"unauthorized"});

            }

        }
    })
};
exports.SelectProfile = (req,res)=>{
    let username = req.headers["username"];
    profileModel.find({Username: username},(error,data)=> {
        if (error) {
            res.status(400).json({status: "fail", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    }
)};
exports.UpdateProfile = (req,res)=>{
    let username = req.headers["username"];
    let reqBody = req.body;
    res.status(200).json(reqBody);

    profileModel.updateOne({Username:username},{$set:reqBody},{upsert:true},(error,data)=>{
        if (error) {
            res.status(400).json({status: "fail", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    })
};