import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + (ext ? '.' + ext : ''));
  }
});
const upload = multer({ storage });

export default upload;