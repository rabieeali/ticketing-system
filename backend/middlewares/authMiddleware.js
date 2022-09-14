const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get Toke Form Header
            token = req.headers.authorization.split(' ')[1]
            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get User From Token
            req.user = await User.findById(decoded.id).select('-password') // exclude password
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('شما مجاز نیستید')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('شما مجاز نیستید')
    }

})

module.exports = { protect }