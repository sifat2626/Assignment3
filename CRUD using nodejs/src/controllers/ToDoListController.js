const toDoListModel = require("../models/ToDoListModel");
exports.CreateToDo = (req,res)=>{
    let reqBody = req.body;
    let username = req.headers["username"];
    let toDoSubject = reqBody["TodoSubject"];
    let toDoDescription = reqBody["TodoDescription"];
    let toDoStatus = "New";
    let toDoCreateDate = Date.now();
    let toDoUpdateDate = Date.now();

    let postBody = {
        Username:username,
        TodoSubject:toDoSubject,
        TodoDescription:toDoDescription,
        TodoStatus:toDoStatus,
        TodoCreateDate:toDoCreateDate,
        TodoUpdateDate:toDoUpdateDate,
    };

    toDoListModel.create(postBody,(err,data)=>{
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
exports.SelectToDo = (req,res)=>{
    let username = req.headers["username"];
    toDoListModel.find({Username: username},(error,data)=> {
            if (error) {
                res.status(400).json({status: "fail", data: error});
            } else {
                res.status(200).json({status: "success", data: data});
            }
        }

    )};
exports.UpdateToDo = (req,res)=>{
    let toDoSubject = req.body["TodoSubject"];
    let toDoDescription = req.body["TodoDescription"];
    let id = req.body["_id"];
    let toDoUpdateDate = Date.now();

    let PostBody = {
        TodoSubject: toDoSubject,
        ToDoDescription:toDoDescription,
        ToDoUpdateDate:toDoUpdateDate
    };

    toDoListModel.updateOne({_id:id},{$set:PostBody},{upsert:true},(error,data)=>{

        if (error) {
            res.status(400).json({status: "failed", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    })};
exports.UpdateStatusToDo = (req,res)=>{
    let id = req.body["_id"];
    let toDoStatus = req.body["TodoStatus"];
    let toDoUpdateDate = Date.now();

    let PostBody = {
        TodoStatus: toDoStatus,
        ToDoUpdateDate:toDoUpdateDate

    };
    toDoListModel.updateOne({_id:id},{$set:PostBody},{upsert:true},(error,data)=>{

        if (error) {
            res.status(400).json({status: "failed", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    });
};
exports.RemoveToDo = (req,res)=>{
    let id = req.body["_id"];
    toDoListModel.remove({_id:id},(error,data)=>{

        if (error) {
            res.status(400).json({status: "failed", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    });
};
exports.SelectToDoByStatus = (req,res)=>{
    let status = req.body["TodoStatus"];
    toDoListModel.find({TodoStatus:status},(error,data)=>{
        if (error) {
            res.status(400).json({status: "fail", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    })
};
exports.SelectToDoByDate = (req,res)=>{
    let fromDate = req.body["FromDate"]  ;
    let toDate = req.body["ToDate"]  ;
    toDoListModel.find({TodoCreateDate: {$gte: new Date(fromDate),$lte: new Date(toDate)}},(error,data)=>{
        if (error) {
            res.status(400).json({status: "fail", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    })
};

