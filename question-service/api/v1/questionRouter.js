import express from 'express';
import QuestionController from '../../controllers/QuestionController.js';

const questionRouter = express.Router();

// Handle GET Requests to /api/v1/questions
questionRouter.get('/', async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  console.log(`GET /api/v1/questions?page=${page}&limit=${limit} from ${req.hostname}`)
  const result = await QuestionController.list(page, limit);
  res.send(result);
});

// Handle POST requests to /api/v1/questions
questionRouter.post('/', async (req, res) => {
  console.log(`POST /api/v1/questions from ${req.hostname}`)
  console.log(req.body)
  const result = await QuestionController.create(req.body);
  res.send(result);
});

// Handle GET requests to /api/v1/questions/:questionId
questionRouter.get('/:questionId', async (req, res) => {
  console.log(`GET /api/v1/questions/${req.params.questionId} from ${req.hostname}`)
  const result = await QuestionController.read(req.params.questionId);
  res.send(result);
});

// Handle PUT requests to /api/v1/questions/:questionId
questionRouter.put('/:questionId', async (req, res) => {
  console.log(`PUT /api/v1/questions/${req.params.questionId} from ${req.hostname}`)
  console.log(req.body)
  const result = await QuestionController.update(req.params.questionId, req.body);
  res.send(result);
});

// Handle DELETE requests to /api/v1/questions/:questionId
questionRouter.delete('/:questionId', async (req, res) => {
  console.log(`DELETE /api/v1/questions/${req.params.questionId} from ${req.hostname}`)
  const result = await QuestionController.delete(req.params.questionId);
  res.send(result);
});

export default questionRouter;
