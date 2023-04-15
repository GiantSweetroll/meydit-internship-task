const express = require('express');
const controller = require('../controllers/queryController')

const router = express.Router();

router.get('/clothings', controller.get_all_clothing_types);

module.exports = router;