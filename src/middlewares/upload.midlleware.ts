import multer from "multer";

const storage = multer.memoryStorage(); // เก็บไฟล์ใน memory ก่อนส่งไป S3

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "video/mp4",
    "audio/mp4",
    "audio/x-m4a"
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images, PDFs, mp4, and m4a are allowed."), false);
  }
};

export const uploadMiddleware = multer({ storage, fileFilter });
