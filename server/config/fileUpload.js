'use strict';
const path = require('path');
// eslint-disable-next-line no-unused-vars
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const { mongoURI } = require('./database');

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err)
          return reject(err);
        const fileName = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
