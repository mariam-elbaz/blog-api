// server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import errorHandler from './middlewares/errorHandler.middleware.js'

dotenv.config()

const app = express()

// Middlewares
app.use(cors({ origin: "*" }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Blog API!')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(errorHandler)


const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})


export default app
