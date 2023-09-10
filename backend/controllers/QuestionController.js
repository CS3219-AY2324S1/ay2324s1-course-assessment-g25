/**
 * Question Controller
 * 
 * This file contains the controller for the Question API endpoints.
 * 
 * @module backend/controllers/QuestionController
 * 
 * @requires backend/data-sources/mongoose/models/QuestionModel
 */

import QuestionModel from '../data-sources/mongoose/models/QuestionModel.js';

class QuestionController {
  static async create(data) {
    const result = await QuestionModel.create(data);
    return result;
  }

  static async read(id) {
    const result = await QuestionModel.findById(id);
    return result;
  }

  static async update(id, data) {
    const result = await QuestionModel.findByIdAndUpdate(id, data);
    return result;
  }

  static async delete(id) {
    const result = await QuestionModel.findByIdAndDelete(id);
    return result;
  }
}

export default QuestionController;