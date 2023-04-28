const controller = require('../controllers/cart');
const authMiddleware = require('../middleware/authMiddleware');
const router = require('express').Router();





router.get('/',authMiddleware,controller.fetchALlByUser); 
// /users/:userId
router.post('/add',authMiddleware,controller.addToCart); 
router.put('/:cartItemId',authMiddleware,controller.updateCart); 
router.delete('/:cartItemId',authMiddleware,controller.removeFromCart); 


// router.put('/:id', controller.update); // /users/:userId
// router.delete('/:id', controller.delete); // /users/:userId

module.exports = router;