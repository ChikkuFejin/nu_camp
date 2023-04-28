const controller = require('../controllers/category');
const router = require('express').Router();




// CRUD Routes /users
router.get('/', controller.fetchALl); // /users
router.get('/:id', controller.fetchOne); // /users/:userId
router.post('/', controller.create); // /users
router.put('/:id', controller.update); // /users/:userId
router.delete('/:id', controller.delete); // /users/:userId

module.exports = router;