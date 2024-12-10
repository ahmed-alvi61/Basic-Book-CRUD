// middleware/authMiddleware.js
const TokenService = require('../services/tokenService');
const ResponseService = require('../services/responseService');
const constants = require('../utilities/constants');
const messages = require('../utilities/messages');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // Check if the token exists in the request header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ResponseService.status = constants.CODE.UNAUTHORIZED;
        return res.status(ResponseService.status).send(
            ResponseService.responseService(
                constants.STATUS.ERROR,
                null,
                messages.UNAUTHORIZED
            )
        );
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    try {
        // Verify the access token using TokenService
        const userData = await TokenService.verifyAccessToken(token);
        
        if (!userData) {
            ResponseService.status = constants.CODE.UNAUTHORIZED;
            return res.status(ResponseService.status).send(
                ResponseService.responseService(
                    constants.STATUS.ERROR,
                    null,
                    messages.UNAUTHORIZED
                )
            );
        }

        // Attach the user data to the request object
        req.user = userData;
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        // Handle any token verification errors
        ResponseService.status = constants.CODE.UNAUTHORIZED;
        return res.status(ResponseService.status).send(
            ResponseService.responseService(
                constants.STATUS.ERROR,
                null,
                messages.UNAUTHORIZED
            )
        );
    }
};

module.exports = authMiddleware;
