const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogPost",
    allowedFormats: [ "png", "jpg"],
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
