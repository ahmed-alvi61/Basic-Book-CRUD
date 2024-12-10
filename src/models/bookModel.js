const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    numberOfPages: { type: Number, required: true }
});

bookSchema.plugin(timestamps);

const BookSchema = mongoose.model('Books', bookSchema, 'Books');

module.exports = { BookSchema };
