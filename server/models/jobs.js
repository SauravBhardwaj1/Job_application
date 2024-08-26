const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Please add a title']
    },
    description:{
        type:String,
        required: [true, 'Please add a description']
    },
    company:{
        type:String,
        required: [true, 'Please add a company']
    },
    location:{
        type: String,
        required: [true, 'Please add a location']
    },
    salary:{
        type: Number,
        required: [true, 'Please add a salary']
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Job', JobSchema);