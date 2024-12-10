const ResponseService = require('../../src/services/responseService');
const constants = require('../../src/utilities/constants');
const messages = require('../../src/utilities/messages');
const userImplementation = require('../implementation/userImplementation');
const userValidationSchema = require('../../src/schemas/userSchema');

class UserController {
    async signUp(req, res) {
        try {
            const data = req.body;
            const { error, value } = await userValidationSchema.signUp(data);
            // Check for validation errors
            if (error) {
                ResponseService.status = constants.CODE.BAD_REQUEST;
                return res.status(ResponseService.status).send(
                    ResponseService.responseService(
                        constants.STATUS.ERROR,
                        error.details[0].message,
                        messages.INVALID_DATA
                    )
                );
            }
            const response = await userImplementation.signUp(value);
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

    async signIn(req, res) {
        try {
            const data = req.body;
            const { error, value } = await userValidationSchema.signIn(data);
            // Check for validation errors
            if (error) {
                ResponseService.status = constants.CODE.BAD_REQUEST;
                return res.status(ResponseService.status).send(
                    ResponseService.responseService(
                        constants.STATUS.ERROR,
                        error.details[0].message,
                        messages.INVALID_DATA
                    )
                );
            }
            const response = await userImplementation.signIn(value);
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

    async signOut(req, res) {
        try {
            const userId = req.params.id;
            const response = await userImplementation.signOut(userId);
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
module.exports = new UserController();
