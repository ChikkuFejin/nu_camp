
    const controller = require('../controllers/mastervaluesController');
    const router = require('express').Router();
    
    // CRUD Routes 
    router.get('/list/page', controller.getAllByPage); // 
    router.get('/list/all', controller.getAll); // /
    router.get('/dropdown/:key', controller.getDropdown); // /
    router.get('/:id', controller.getById); // /:userId
    router.post('/', controller.create); // 
    router.put('/:id', controller.update); // /:userId
    router.delete('/:id', controller.delete); // /:userId
    
    module.exports = router;

  