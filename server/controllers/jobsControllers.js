const Job = require("../models/job")

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
exports.createJob = async(req,res,next)=>{
    const {title, description, company, location, salary} = req.body

    if(!title || !description || !company || !location || !salary){
        return res.status(400).json({msg: 'Please fill all fields'})
    }

    try {
        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            user: req.user.id
        })

        res.status(201).json({success:true,data: job, msg: 'Job created successfully'})
    } catch (error) {
        return next(new errorResponse('Error creating job', 500))
    }
}


// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async(req, res, next)=>{
    try {
        const jobs = await Job.find().populate('user', 'name email');

        res.status(200).json({success:true, data:jobs})
    } catch (error) {
        return next(new errorResponse('Error getting jobs',500))
    }
}


// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
exports.deleteJob = async(req,res,next)=>{
    try {
        const job = await Job.findById(req.params.id)

        if(!job){
            return next(new errorResponse('Job not found'))
        }

        if(job.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return next(new errorResponse('Not authorized to delete this job', 401))
        }

        await job.remove();

        res.status(200).json({success: true, data:{} })
    } catch (error) {
        return next(new errorResponse('Error deleting job', 500))
    }
}


