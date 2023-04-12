const express = require('express')
const controller = require('../controllers/consumerController')

const router = express.Router()

router.post('/job', controller.post_job)

module.exports = router