const controller = require('../controllers/dropdown');
const router = require('express').Router();




// CRUD Routes /users
router.get('/category', controller.category); // /users


module.exports = router;