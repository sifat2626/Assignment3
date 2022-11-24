const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    Username:{type:String},
    TodoSubject:{type:String},
    TodoDescription:{type:String},
    TodoStatus:{type:String},
    TodoCreateDate:{type:Date},
    TodoUpdateDate:{type:Date},

},{versionKey:false});
const toDoListModel = mongoose.model("toDoList",dataSchema);
module.exports = toDoListModel;