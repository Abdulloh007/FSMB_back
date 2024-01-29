const UserServices = require('../services/user.service');

// Function to create a new user
function createUser(req, res) {
    // Get the user data from request body
    const user = req.body;
    // Validate the user data
    if (!user) {
        return res.status(400).json({ error: 'User is required' });
    }
    // Call the service function with the new user data
    UserServices.createUser(user)
        .then(createdUser => {
            res.status(201).json(createdUser);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Function to get all users
function getAllUsers(req, res) {
    // Call the service function
    UserServices.getAllUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Function to get a user by ID
function getUserById(req, res) {
    // Get the user ID from request params
    const userId = req.params.id;
    // Call the service function with the user ID
    UserServices.getUserById(userId)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Function to update a user
function updateUser(req, res) {
    // Get the user ID from request params
    const userId = req.params.id;
    // Get the updated data from request body
    const updatedUser = req.body;
    // Call the service function with the updated data
    UserServices.updateUser(userId, updatedUser)
        .then(updatedUser => {
            res.status(200).json(updatedUser);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Function to delete a user
function deleteUser(req, res) {
    // Get the user ID from request params
    const userId = req.params.id;
    // Call the service function with the user ID
    UserServices.deleteUser(userId)
        .then(deletedUser => {
            res.status(200).json(deletedUser);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Export the controller functions
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
