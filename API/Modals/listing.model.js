import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema], // An array of options
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  userRef: { type: String, required: true },
},
{ timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;