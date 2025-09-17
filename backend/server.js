const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
require('./mongodb') 
const app = express()
const PORT = 5001

//routers
const authRouter = require('./routes/auth')
const userManagementRouter = require('./routes/userManagement')
const departmentRouter = require('./routes/department')
const shiftRouter = require('./routes/shiftManagement')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api', authRouter)
app.use('/api/um', userManagementRouter)
app.use('/api/dept', departmentRouter)
app.use('/api/shift', shiftRouter)

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`)
})