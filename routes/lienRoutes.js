const express = require('express');
const router = express.Router();
const lienController = require('../controllers/lienController.js');

/*
 * GET
 */
router.get('/', lienController.list);

/*
 * GET
 */
router.get('/:id', lienController.show);

/*
 * POST
 */
router.post('/', lienController.create);

/*
 * PUT
 */
router.put('/:id', lienController.update);

/*
 * DELETE
 */
router.delete('/:id', lienController.remove);

module.exports = router;
