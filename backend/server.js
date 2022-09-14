const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const app = express()
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect To DB
connectDB()


// 1. let the server accept and consume body data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 2. using a middleware for routes

app.use('/api/users', require('./routes/usersRoutes'))
app.use(errorHandler)




app.listen(PORT, () => console.log(`Server Is Running On ${PORT}`))