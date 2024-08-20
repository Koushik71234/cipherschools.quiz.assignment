const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const TestResultModel = require('./models/TestResult.js');
const UsersModel = require('./models/Users.js'); // Adjust the path as necessary

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'koushikmanikanta71@gmail.com',
        pass: 'kicn uofb ipxf cuay' // Replace with your actual app password
    }
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Cron job runs every hour
cron.schedule('0 * * * *', async () => {
    console.log('Running cron job every hour...');

    try {
        // Fetch un-evaluated test results
        const tests = await TestResultModel.find({ evaluated: false }).populate('userId').exec();

        if (tests.length === 0) {
            console.log('No tests to evaluate at this time.');
            return;
        }

        console.log(`Found ${tests.length} test(s) to evaluate.`);

        for (const test of tests) {
            // Log the test and userId details
            console.log('Test:', test); // Log the entire test object
            console.log('UserId:', test.userId); // Log the userId object

            if (!test.userId || !test.userId.email) {
                console.log(`Skipping test with userId ${test.userId ? test.userId._id : 'null'} due to missing email.`);
                continue;
            }

            const correctAnswers = [
                "4", "Hypertext Markup Language", "CSS", "Paris", "HTML",
                "Cascading Style Sheets", "JavaScript", "Sun Microsystems",
                "<ul>", "80"
            ];

            let score = 0;

            // Evaluate answers
            test.answers.forEach((answer, index) => {
                if (answer === correctAnswers[index]) {
                    score += 1;
                }
            });

            // Update test result
            test.score = score;
            test.evaluated = true;
            await test.save();

            // Send email with results
            const mailOptions = {
                from: 'koushikmanikanta71@gmail.com',
                to: test.userId.email,
                subject: 'Your Quiz Results',
                text: `Dear ${test.userId.name},\n\nYour score for the quiz is: ${score}/10.\n\nBest regards,\nYour Company`
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${test.userId.email}: ${score}/10`);
        }
    } catch (err) {
        console.error('Error running cron job:', err);
    }
});
