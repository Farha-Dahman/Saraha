import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const fileValidation = {
  image: ["image/jpeg", "image/png", "image/webp"],
  file: ["application/pdf"],
};

function fileUpload(customValidation = [], customPath) {
  const filePath = path.join(__dirname, "../uploads");
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      const suffixName = nanoid() + file.originalname;
      file.dest = `upload/${customPath}/${suffixName}`;
      cb(null, nanoid() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid extension", false);
    }
  }

  const upload = multer({ fileFilter, storage });
  return upload;
}

export default fileUpload;
