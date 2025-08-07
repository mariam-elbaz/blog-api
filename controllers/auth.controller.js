import { registerUser, loginUser } from '../services/auth.service.js'

// Register Controller
export const register = async (req, res) => {
  try {
    const data = await registerUser(req.body)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Login Controller
export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body)
    res.status(200).json(data)
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}
