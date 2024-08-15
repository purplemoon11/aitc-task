import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const multerFilter = function (
  req: any,
  file: { mimetype: string },
  cb: (arg0: null, arg1: boolean) => void
) {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video") ||
    file.mimetype.startsWith("application")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});
