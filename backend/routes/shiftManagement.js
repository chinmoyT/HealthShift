const express = require('express')
const router = express.Router();
const isTokenAuthenticated = require('../middlewares/authentication');
const { addShift } = require('../controllers/shiftManagement');

router.post('/', isTokenAuthenticated, addShift)

module.exports = router