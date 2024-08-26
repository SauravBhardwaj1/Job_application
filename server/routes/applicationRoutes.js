const express = require('express')
const { applyJob, getApplications } = require('../controllers/applicationController')
const {protect, authorize} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/:jobId/apply').post(protect, applyJob)
router.route('/:jobId/applications').get(protect, authorize('admin', 'user'), getApplications)

module.exports = router