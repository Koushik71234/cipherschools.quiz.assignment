
const mongoose = require('mongoose');

// User Schema definition
const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    testResults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestResult' }] // Store references to test results
});

// User model definition
const UsersModel = mongoose.model("User", UsersSchema);

module.exports = UsersModel;
