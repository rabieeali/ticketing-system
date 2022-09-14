const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc        Register a New User
// @route       /api/users
// @access      Public
const registerUsers = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('لطفا همه مقادیر خواسته شده را پر کنید')
    }

    // Find If User Already Exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('کاربر وجود دارد')
    }

    // Hash Password Comming From Body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a User

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // It's a Costume Function We Made Down Below
        })
    } else {
        res.status(400)
        throw new Error('اطلاعات کاربر درست نیست')
    }

})




// @desc        Login a User
// @route       /api/users/login
// @access      Public
const loginUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    // Check If user Exists and Password Matches

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // It's a Costume Function We Made Down Below
        })
    } else {
        res.status(401)
        throw new Error('اطلاعات نادرست است')
    }
})



// @desc        Get Current User
// @route       /api/users/me
// @access      Private
const getMe = asyncHandler(async (req, res) => {

    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)

})






//  Generate Token Function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    registerUsers,
    loginUsers,
    getMe
}



