const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Routes without authentication
router.get('/', visitorController.getVisitors);
router.get('/ip/:ip', visitorController.getVisitorByIp);
router.post('/', visitorController.createOrUpdateVisitor);
router.delete('/:id', visitorController.deleteVisitor);
router.get('/statistics', visitorController.getVisitorStats);

module.exports = router;