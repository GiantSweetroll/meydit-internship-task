const express = require('express');
const controller = require('../controllers/queryController')

const router = express.Router();

router.get('/clothings', controller.get_all_clothing_types);
router.get('/user/:id', controller.get_user)
router.get('/statuses', controller.get_all_status_types)
router.get('/job-images/:id', controller.get_job_images)

module.exports = router;