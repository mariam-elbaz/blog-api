import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import errorHandler from './middlewares/errorHandler.middleware.js'


dotenv.config()

const app = express()

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // اسم الدومين اللي عايزة تسمحي له يتصل
  credentials: true // لو بتشتغلي بجلسات أو Cookies
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Blog API!');
});

//1. Register routes
app.use('/api/auth', authRoutes)

//2. User routes
app.use('/api/users', userRoutes)

//3. Posts routes
app.use('/api/posts', postRoutes)


app.use(errorHandler)



export default app
