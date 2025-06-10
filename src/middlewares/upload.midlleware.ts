import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "video/mp4",
    "audio/mpeg", 
    "audio/mp3" 
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images, PDFs, mp4, and mp3 are allowed."), false);
  }
};

export const uploadMiddleware = multer({ storage, fileFilter });
