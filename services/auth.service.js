import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Register a new user
export const registerUser = async ({ username, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('User already exists with this email.')
  }

  // Create and save new user
  const user = new User({ username, email, password })
  await user.save()

  const token = generateToken(user)

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar || null
    },
    token
  }
}

// Login user
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid credentials.')
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new Error('Invalid credentials.')
  }

  const token = generateToken(user)

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar || null
    },
    token
  }
}
