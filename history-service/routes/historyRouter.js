const express = require('express');
const historyController = require("../controllers/historyController");
const historyRouter = express.Router();

historyRouter.post("/add", historyController.addQuestions);
historyRouter.get("/byUser/:username", historyController.getHistoryByUser);
historyRouter.get("/byRoomId/:roomId", historyController.getHistoryByRoomId);
historyRouter.get("/byQuestionId/:questionId", historyController.getHistoryByQuestionId);

module.exports = historyRouter;