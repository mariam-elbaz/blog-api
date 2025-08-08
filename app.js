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
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // السماح بطلبات Postman أو سيرفر لسيرفر
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false // خلي CORS يتعامل مع OPTIONS تلقائي
}));

// معالجة أي طلب OPTIONS لأي مسار (Express 5 compatible)
app.options(/.*/, cors({
  origin: allowedOrigins,
  credentials: true
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
