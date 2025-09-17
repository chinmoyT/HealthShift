const express = require('express')
const router = express.Router();

const {createDepartment,
    getStaffWithDepartment,
    getDepartmentsList,
    getDepartmentById
} = require("../controllers/department")
const isTokenAuthenticated = require('../middlewares/authentication')

router.get('/',isTokenAuthenticated, getDepartmentsList)
router.post('/', isTokenAuthenticated, createDepartment)
router.get('/:id', isTokenAuthenticated, getDepartmentById)

module.exports = router;