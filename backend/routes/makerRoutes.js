const express = require('express')
const controller = require('../controllers/makerController')

const router = express.Router()

router.get('/jobs', controller.list_jobs)
router.post('/send-quotes', controller.send_quotes)

module.exports = router