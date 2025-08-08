import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import errorHandler from './middlewares/errorHandler.middleware.js'


dotenv.config()

const app = express()

// جلب قيمة الـ origin الحالي تلقائياً
const allowedOrigins = [
  'http://localhost:5173', // أثناء التطوير
  'https://blog-n670064nl-mariam-elbazs-projects-e3dc46fd.vercel.app' // بعد النشر على Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // لو الـ origin مش موجود (زي Postman) أو موجود في القائمة المسموح بها
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // لو عندك Cookies أو JWT
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
