const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/carOwners');

router.get('/:filterId', ctrl.findSome);

module.exports = router;
