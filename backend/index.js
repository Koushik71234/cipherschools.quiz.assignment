const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersModel = require('./models/Users');
const quizRoutes = require('./routes/Quizsubmission'); // Adjust path if necessary

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/users")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the quiz submission routes
app.use('/api', quizRoutes);

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    usersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

app.post('/register', (req, res) => {
    usersModel.create(req.body)
        .then(feed => res.json(feed))
        .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

app.listen(3001, () => {
    console.log("server is running on port 3001");
});

