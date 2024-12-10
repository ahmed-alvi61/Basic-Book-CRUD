const ResponseService = require('../../src/services/responseService');
const tokenService = require('../../src/services/tokenService');
const constants = require('../../src/utilities/constants');
const messages = require('../../src/utilities/messages');
const UserQueries = require('../../src/queries/userQueries');
const bcrypt = require('bcrypt');


class UserImplementation {
    async signUp(data) {
        try {
            const { email, username, phone } = data;
            const errorMessages = [];

            // Check if any user already exists with the given email, username, or phone
            const existingUser = await UserQueries.getUserDetailsByData(data);

            if (existingUser) {
                // Check individually and add corresponding error messages
                if (existingUser.email === email) errorMessages.push(messages.EMAIL_EXISTS);
                if (existingUser.username === username) errorMessages.push(messages.USERNAME_EXISTS);
                if (existingUser.phone === phone) errorMessages.push(messages.PHONE_NUMBER_EXISTS);
            }

            // If there are any error messages, send them in the response
            if (errorMessages.length > 0) {
                ResponseService.status = constants.CODE.BAD_REQUEST;
                return ResponseService.responseService(
                    constants.STATUS.ERROR,
                    [],
                    errorMessages
                );
            }
            //hashedPassword
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;

            const response = await UserQueries.createUser(data);
            if (response) {
                ResponseService.status = constants.CODE.OK;
                return ResponseService.responseService(
                    constants.STATUS.SUCCESS,
                    response,
                    messages.SUCCESSFULLY_SIGN_UP
                );
            }
        } catch (error) {
            // Handle errors and return an error response
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async signIn(data) {
        try {
            const user = await UserQueries.getUserByEmail(data.email);

            if (!user) {
                ResponseService.status = constants.CODE.BAD_REQUEST;
                return ResponseService.responseService(
                    constants.STATUS.ERROR,
                    [],
                    messages.USER_NOT_FOUND
                );
            }

            const isMatch = await bcrypt.compare(data.password, user.password);

            if (!isMatch) {
                ResponseService.status = constants.CODE.BAD_REQUEST;
                return ResponseService.responseService(
                    constants.STATUS.ERROR,
                    [],
                    messages.INVALID_CREDENTIALS
                );
            }
            const userData = { id: user._id, email: user.email};

            const accessToken = await tokenService.accessToken(userData);
            const refreshToken = await tokenService.refreshToken(user._id);
            user.refreshToken = refreshToken;
            await user.save();

            ResponseService.status = constants.CODE.OK;
            return ResponseService.responseService(
                constants.STATUS.SUCCESS,
                { accessToken: accessToken, user: user },
                messages.RECORD_FOUND
            );
        } catch (error) {
            ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
            return ResponseService.responseService(
                constants.STATUS.EXCEPTION,
                error.message,
                messages.EXCEPTION
            );
        }
    }

    async signOut(userId) {
        try {
            // Nullify the user's refresh token in the database
            const user = await UserQueries.getUser(userId);
            if (!user) {
                ResponseService.status = constants.CODE.BAD_REQUEST;
                return res.status(ResponseService.status).send(
                    ResponseService.responseService(
                        constants.STATUS.ERROR,
                        [],
                        messages.USER_NOT_FOUND
                    )
                );
            }
            user.refreshToken = null;
            await user.save();

            // Return success response
            ResponseService.status = constants.CODE.OK;
            return ResponseService.responseService(
                constants.STATUS.SUCCESS,
                [],
                messages.SIGN_OUT_SUCCESSFULLY
            );
        } catch (error) {
            // Handle errors and return an error response
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
module.exports = new UserImplementation();