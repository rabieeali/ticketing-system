const express = require('express')
const router = express.Router()
const { loginUsers, registerUsers, getMe } = require('../controllers/usersController')

const { protect } = require('../middlewares/authMiddleware')

router.post('/', registerUsers)
router.post('/login', loginUsers)
router.get('/me', protect, getMe)


module.exports = router