const express = require('express');
const router = express.Router();
const {handleUserRegister, 
    getUsersList, 
    getUserById, 
    updateUser,
    deactivateUser,
    createStaffProfile,
    getStaffProfileList,
    updateStaffProfile,
    getStaffProfileById
} = require('../controllers/userManagement');
const isTokenAuthenticated = require('../middlewares/authentication');

router.post('/register', isTokenAuthenticated, handleUserRegister);
router.get('/', isTokenAuthenticated, getUsersList);
router.put('/', isTokenAuthenticated, updateUser);
router.post('/staff',isTokenAuthenticated, createStaffProfile);
router.get('/staff', isTokenAuthenticated, getStaffProfileList);
router.put('/staff', isTokenAuthenticated, updateStaffProfile)
router.put('/deactivate/:id', isTokenAuthenticated, deactivateUser);
router.get('/:id', isTokenAuthenticated, getUserById);
router.get('/staff/:id', isTokenAuthenticated, getStaffProfileById)

module.exports = router;
