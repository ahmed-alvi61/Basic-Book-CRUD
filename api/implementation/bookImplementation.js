const ResponseService = require('../../src/services/responseService');
const constants = require('../../src/utilities/constants');
const messages = require('../../src/utilities/messages');
const BookQueries = require('../../src/queries/bookQueries');


class CategoryImplementation {
    async addNewBook(data) {
        try {
            const response = await BookQueries.createNewBook(data);

            if (response) {
                ResponseService.status = constants.CODE.OK;
                return ResponseService.responseService(
                    constants.STATUS.SUCCESS,
                    response,
                    messages.BOOK_SUCCESSFULLY_CREATED
                );
            } else {
                ResponseService.status = constants.CODE.ACCEPTED;
                return ResponseService.responseService(
                    constants.STATUS.ACCEPTED,
                    response,
                    messages.NO_RECORD_FOUND
                );
            }
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async listOfAllBooks() {
        try {
            const response = await BookQueries.listOfAllBooks();

            if (response) {
                ResponseService.status = constants.CODE.OK;
                return ResponseService.responseService(
                    constants.STATUS.SUCCESS,
                    response,
                    messages.BOOK_SUCCESSFULLY_FOUND
                );
            }
            else {
                ResponseService.status = constants.CODE.ACCEPTED;
                return ResponseService.responseService(
                    constants.STATUS.ACCEPTED,
                    response,
                    messages.NO_RECORD_FOUND
                );
            }
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async updateBookDetail(data, id) {
        try {
            const response = await BookQueries.updateBookDetail(data, id);

            if (response) {
                ResponseService.status = constants.CODE.OK;
                return ResponseService.responseService(
                    constants.STATUS.SUCCESS,
                    response,
                    messages.BOOK_SUCCESSFULLY_UPDATED
                );
            }
            else {
                ResponseService.status = constants.CODE.ACCEPTED;
                return ResponseService.responseService(
                    constants.STATUS.ACCEPTED,
                    response,
                    messages.NO_RECORD_FOUND
                );
            }
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async getBookById(id) {
        try {
            const response = await BookQueries.getBookById(id);

            if (response) {
                ResponseService.status = constants.CODE.OK;
                return ResponseService.responseService(
                    constants.STATUS.SUCCESS,
                    response,
                    messages.BOOK_SUCCESSFULLY_FOUND
                );
            }
            else {
                ResponseService.status = constants.CODE.ACCEPTED;
                return ResponseService.responseService(
                    constants.STATUS.ACCEPTED,
                    response,
                    messages.NO_RECORD_FOUND
                );
            }
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async deleteBook(id) {
        try {
            const response = await BookQueries.deleteBook(id);

            if (response) {
                ResponseService.status = constants.CODE.OK;
                return ResponseService.responseService(
                    constants.STATUS.SUCCESS,
                    response,
                    messages.BOOK_SUCCESSFULLY_DELETED
                );
            }
            else {
                ResponseService.status = constants.CODE.ACCEPTED;
                return ResponseService.responseService(
                    constants.STATUS.ACCEPTED,
                    response,
                    messages.NO_RECORD_FOUND
                );
            }
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

module.exports = new CategoryImplementation();