const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User schema

const taskSchema  = new Schema({
    title: {
         type: String,
         required:[true,"title is required"]
    },

description:{
    type :String,
    required: [true,'description is required']
},
tags:{
    type:String,
    enum:['important', 'urgent'],
    required:true
},
 createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required: true
}

},{timestamps:true});

const TASKS = mongoose.model('Tasks',taskSchema);

module.exports = TASKS;
