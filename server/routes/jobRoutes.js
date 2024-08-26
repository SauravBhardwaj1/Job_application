const express = require('express')
const { getJobs, createJob, deleteJob } = require('../controllers/jobController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, authorize('admin'), createJob).get(getJobs)
router.route('/:id').delete(protect, authorize('admin'), deleteJob)


module.exports = router;