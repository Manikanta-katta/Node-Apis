const express = require('express')
const authenticateToken = require('../contollers/authController')
const router = express.Router()

const EmployeeController = require('../contollers/employeeController')
const upload = require('../middleware/upload')
router.get('/',authenticateToken.authenticateToken,EmployeeController.index)
router.post('/show',authenticateToken.authenticateToken,EmployeeController.show)
router.post('/store',upload.single('avatar'),EmployeeController.store)
router.post('/update',EmployeeController.update)
router.post('/delete',EmployeeController.destroy)

module.exports = router