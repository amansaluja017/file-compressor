import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/temp");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
  storage,
});

export { upload };