const { Router } = require('express');
const bookController = require('../controllers/bookController');
const verifyAccessToken = require('../../src/services/tokenService');

const router = Router();

router.post('/createNewBook',verifyAccessToken.verifyAccessToken, bookController.addNewBook);
router.get('/allBooks',verifyAccessToken.verifyAccessToken, bookController.listOfAllBooks);
router.get('/getBookById/:id',verifyAccessToken.verifyAccessToken, bookController.getBookById);
router.put('/updateBookDetail/:id',verifyAccessToken.verifyAccessToken, bookController.updateBookDetail);
router.delete('/deleteBook/:id',verifyAccessToken.verifyAccessToken, bookController.deleteBook);

module.exports = router;