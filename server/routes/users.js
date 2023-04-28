const controller = require('../controllers/users');
const router = require('express').Router();
const multer = require('multer');
const { storage } = require('../Utlity/fileuploads');

const upload = multer({ storage: storage })

// CRUD Routes /users
router.get('/', controller.getUsers); // /users
router.get('/:userId', controller.getUser); // /users/:userId
router.post('/',upload.single('file'), controller.createUser); // /users
router.put('/:userId',upload.single('file'), controller.updateUser); // /users/:userId
router.delete('/:userId', controller.deleteUser); // /users/:userId

module.exports = router;