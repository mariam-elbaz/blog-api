import multer from 'multer'
import path from 'path'

// تخزين الملفات في مجلد uploads مع اسم فريد
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  }
})

const upload = multer({ storage })

export default upload
