const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config
app.use(cors())

//Connect to database
connectDB()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000

const authRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const errorHandler = require('./middleware/errorHandler')


app.get('/', (req,res)=>{
    res.send('Welcome to the job-application backend!')
})

app.use('api/auth', authRoutes)
app.use('api/jobs', jobRoutes)
app.use('api/applications', applicationRoutes)

app.use(errorHandler)


const server = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)

})

process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=> process.exit(1))
})