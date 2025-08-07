import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser
} from '../services/post.service.js'

// Create post
export const create = async (req, res) => {
  try {
    const post = await createPost({ ...req.body, userId: req.user._id })
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get all posts
export const getAll = async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single post
export const getOne = async (req, res) => {
  try {
    const post = await getPostById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update post
export const update = async (req, res) => {
  try {
    const post = await updatePost(req.params.id, req.user._id.toString(), req.body)
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete post
export const remove = async (req, res) => {
  try {
    const result = await deletePost(req.params.id, req.user._id.toString())
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get posts by current user
export const getMyPosts = async (req, res) => {
  try {
    const posts = await getPostsByUser(req.user._id)
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
