const express = require('express');
const router = express.Router();






router.use('/category', require('./categoryRoute.js')); // New content to append


router.use('/beds', require('./bedsRoute.js')); // New content to append


router.use('/campers', require('./campersRoute.js')); // New content to append


router.use('/mastervalues', require('./mastervaluesRoute.js')); // New content to append


router.use('/reservations', require('./reservationsRoute.js')); // New content to append


router.use('/roomcategories', require('./roomCategoriesRoute.js')); // New content to append

router.use('/user', require('./userRoute.js')); // New content to append





router.use('/camps', require('./campsRoute.js')); // New content to append

module.exports = router;