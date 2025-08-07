import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  getMyPosts
} from '../controllers/post.controller.js'

const router = express.Router()

// Public routes
router.get('/', getAll)
router.get('/:id', getOne)

// Protected routes
router.post('/', authMiddleware, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)
router.get('/me/posts', authMiddleware, getMyPosts)
// router.get('/my-posts', authMiddleware, getMyPosts)

export default router
