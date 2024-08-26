

const application = require("../models/application")
const application = require("../models/application")
const Job = require("../models/job")
const errorResponse = require("../utils/errorResponse")

// @desc    Apply for a job
// @route   POST /api/jobs/:jobId/apply
// @access  Private
exports.applyJob = async(req,res,next)=>{
    const {resume, coverLetter} = req.body

    try {
        const job = await Job.findById(req.params.jobId)

        if(!job){
            return next(new errorResponse('Job not found', 404))
        }

        const application = await application.create({
            job: req.params.jobId,
            user: req.user.id,
            resume,
            coverLetter
        });

        res.status(200).json({success: true, data: application})
    } catch (error) {
        return next(new errorResponse('Error applying for job', 500))
    }
}

// @desc    Get all applications for a job
// @route   GET /api/jobs/:jobId/applications
// @access  Private (Admin & Job Poster)
exports.getApplications = async(req,res,next)=>{
    try {
        const job = await Job.findById(req.params.jobId)

        if(!job){
            return next(new errorResponse('Job not found', 404))
        }

        if(job.user.toString() !== req.user.id && req.user.role !== 'admin' ){
            return next(new errorResponse('No authorized to view applications', 401))
        }

        const applications = await application.find({ job: req.params.jobId}).populate('user', 'name email');
        
        res.status(200).json({success: true, data: applications})
    } catch (error) {
        return next(new errorResponse('Error while getting applications', 500))
    }
}