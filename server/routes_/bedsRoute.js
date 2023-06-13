
    const controller = require('../controllers/bedsController');
    const router = require('express').Router();
    
    // CRUD Routes 
    router.get('/page', controller.getAllByPage); // 
    router.get('/getAll', controller.getAll); // /
    router.get('/:id', controller.getById); // /:userId
    router.post('/', controller.create); // 
    router.put('/:id', controller.update); // /:userId
    router.delete('/:id', controller.delete); // /:userId
    
    module.exports = router;

  