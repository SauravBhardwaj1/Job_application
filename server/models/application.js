const mongoose = require('mongoose')


const ApplicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume:{
        type: String,
        required: [true, 'please upload your resume']
    },
    coverLetter:{
        type: String,
        required: [true, 'please upload your cover letter']
    },
    status:{
        type: String,
        enum: ['applied', 'under review', 'accepted', 'rejected'],
        default: 'applied'
    },
    appliedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Application', ApplicationSchema);