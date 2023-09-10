/**
 * Question Model
 * 
 * This file contains the model for the Question API endpoints.
 * 
 * @module backend/data-sources/mongoose/models/QuestionModel
 * 
 * @requires mongoose
 */

import mongoose from 'mongoose';

// Create a schema for a question
const questionSchema = new mongoose.Schema({
  // The title of the question
  title: {
    type: String,
    required: true
  },
  // The description of the question
  description: {
    type: String,
    required: true
  },
  // The category of the question (e.g. "Arrays")
  category: {
    type: String,
    required: true
  },
  // The complexity of the question (e.g. ["Easy", "Medium", "Hard"])
  complexity: {
    type: String,
    required: true
  },
});

// Create a model for a question
const QuestionModel = mongoose.model('Question', questionSchema);

// Export the model
export default QuestionModel;
