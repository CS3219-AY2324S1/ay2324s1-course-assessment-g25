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

  static async list(page, limit) {
    // TODO: Consider using range queries to improve performance.
    // https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#pagination-example
    const result = await QuestionModel.find().skip((page - 1) * limit).limit(limit);
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
