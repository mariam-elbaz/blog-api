// Get logged-in user's data
export const getCurrentUser = (req, res) => {
  try {
    const user = req.user // user was attached by authMiddleware
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
