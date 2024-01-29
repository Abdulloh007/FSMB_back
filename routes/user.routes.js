const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// GET all users
router.get('/', UserController.getAllUsers);

// GET a specific user
router.get('/:id', UserController.getUserById);

// CREATE a new user
router.post('/', UserController.createUser);

// UPDATE a user
router.put('/:id', UserController.updateUser);

// DELETE a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
