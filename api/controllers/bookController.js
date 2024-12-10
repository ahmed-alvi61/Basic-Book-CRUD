const ResponseService = require('../../src/services/responseService');
const constants = require('../../src/utilities/constants');
const messages = require('../../src/utilities/messages');
const bookImplementation = require('../implementation/bookImplementation');

class BookController {
    async addNewBook(req, res) {
        try {
            const data = req.body;
            if (!data) {
                ResponseService.status = constants.CODE.BAD_REQUEST;
                return res.status(ResponseService.status).send(
                    ResponseService.responseService(
                        constants.STATUS.ERROR,
                        error.details[0].message,
                        messages.INVALID_DATA
                    )
                );
            }
            const response = await bookImplementation.addNewBook(data);
            res.status(ResponseService.status).send(response);
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async listOfAllBooks(req, res) {
        try {
            const response = await bookImplementation.listOfAllBooks();
            res.status(ResponseService.status).send(response);
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async updateBookDetail(req, res) {
        try {
            const data = req.body;
            const id = req.params.id;
            const response = await bookImplementation.updateBookDetail(data,id);
            res.status(ResponseService.status).send(response);
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async deleteBook(req, res) {
        try {
            const id = req.params.id;
            const response = await bookImplementation.deleteBook(id);
            res.status(ResponseService.status).send(response);
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async getBookById(req, res) {
        try {
            const id = req.params.id;
            const response = await bookImplementation.getBookById(id);
            res.status(ResponseService.status).send(response);
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }
}

// Export an instance of the class to use its methods
module.exports = new BookController();
