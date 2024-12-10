const { BookSchema } = require("../models/bookModel");

class BookQueries {

    async createNewBook(data) {
        const newBook = new BookSchema(data);
        const savedBook = await newBook.save();
        return savedBook;
    }

    async listOfAllBooks() {
        const books = await BookSchema.find();
        return books;
    }

    async updateBookDetail(data, id) {
        return await BookSchema.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
    }

    async getBookById(id) {
        return await BookSchema.findById(id);
    }

    async deleteBook(id) {
        return await BookSchema.findByIdAndDelete(id);
    }
}

module.exports = new BookQueries();