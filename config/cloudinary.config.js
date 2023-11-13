const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dvubyaiw2",
  api_key: "182638556722968",
  api_secret: "2btXv2YL3qI_dohMlQ5jkucwBhE",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "SportsConnect-gallery", // The name of the folder in cloudinary
    // resource_type: "raw", // => this is in case you want to upload other types of files, not just images
  },
});

module.exports = multer({ storage });
