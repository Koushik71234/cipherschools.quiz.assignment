


const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: Map, of: String, required: true },
  score: { type: Number },
  evaluated: { type: Boolean, default: false }
//   email: {type:String}
});

const TestResultModel = mongoose.model('TestResult', TestResultSchema);

module.exports = TestResultModel;

