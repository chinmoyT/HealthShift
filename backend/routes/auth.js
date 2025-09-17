const express = require('express');
const { handleLogin, handleAccess } = require('../controllers/auth');
const isTokenAuthenticated = require('../middlewares/authentication');
const router = express.Router();

router.post('/login', handleLogin)
router.get('/access', isTokenAuthenticated, handleAccess);

module.exports = router;