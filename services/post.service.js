import Post from '../models/post.model.js'

// Create a new post
export const createPost = async ({ title, body, img, userId }) => {
  const post = new Post({ title, body, img, author: userId })
  await post.save()
  return post
}

// Get all posts
export const getAllPosts = async () => {
  return await Post.find().populate('author', 'username avatar').sort({ createdAt: -1 })
}

// Get single post by ID
export const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username avatar')
}

// Update a post
export const updatePost = async (id, userId, updateData) => {
  const post = await Post.findById(id)
  if (!post) throw new Error('Post not found')
  if (post.author.toString() !== userId) throw new Error('Not authorized')

  Object.assign(post, updateData)
  await post.save()
  return post
}

// Delete a post
export const deletePost = async (id, userId) => {
  const post = await Post.findById(id)
  if (!post) throw new Error('Post not found')
  if (post.author.toString() !== userId) throw new Error('Not authorized')

  await post.deleteOne()
  return { message: 'Post deleted successfully' }
}

// Get posts by user
export const getPostsByUser = async (userId) => {
  return await Post.find({ author: userId }).sort({ createdAt: -1 })
}
