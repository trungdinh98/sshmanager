const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController')

router.get('/list', UsersController.listUser);
router.post('/update/:id', UsersController.update);
router.post('/delete/:id', UsersController.delete);
router.post('/updateID/:id', UsersController.updateID);
router.post('/add', UsersController.add);

module.exports = router;