const Joi = require('joi');

class BookValidationSchema {
    async createBook(data) {
        const schema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            publishedDate: Joi.date().required(),
            numberOfPages: Joi.number().integer().positive().required(),
        });
        return schema.validate(data);
    }
}

module.exports = new BookValidationSchema();
