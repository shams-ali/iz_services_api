var express = require('express');
var router = express.Router();
var invoiceController = require('../controllers/invoiceController.js');

/*
 * GET
 */
router.get('/', invoiceController.list);

/*
 * GET
 */
router.get('/:id', invoiceController.show);

/*
 * POST
 */
router.post('/', invoiceController.create);

/*
 * PUT
 */
router.put('/:id', invoiceController.update);

/*
 * DELETE
 */
router.delete('/:id', invoiceController.remove);

module.exports = router;
