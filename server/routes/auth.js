const controller = require('../controllers/auth');
const router = require('express').Router();




// CRUD Routes /users
router.post('/login', controller.login); // /users
// /users/:userId
// router.post('/', controller.create); // /users
// router.put('/:id', controller.update); // /users/:userId
// router.delete('/:id', controller.delete); // /users/:userId

module.exports = router;