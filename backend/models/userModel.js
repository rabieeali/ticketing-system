const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'لطفا نام را وارد کنید']
    },
    email: {
        type: String,
        required: [true, 'لطفا ایمیل را وارد کنید'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'لطفا پسورد را وارد کنید']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('User', userSchema)