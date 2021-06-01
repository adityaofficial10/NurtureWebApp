'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  filename: {
    required: true,
    type: String,
  },
  type: {
    type: String,
    default: 'profile',
  },
  fileId: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

module.exports = ImageSchema;
