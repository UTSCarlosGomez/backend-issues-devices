import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  auth0_id: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
}, { versionKey: false })

const User = mongoose.model('User', userSchema)

export default User
