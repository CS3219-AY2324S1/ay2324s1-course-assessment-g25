const express = require('express')
const matchController = require("../controllers/matchController");
const matchRouter = express.Router();

matchRouter.post("/", matchController.addPair)
matchRouter.get("/getPair/:username", matchController.getPairByUsername)
matchRouter.get("/getByRoom/:roomId", matchController.getPairByRoomId)
matchRouter.delete("/deletePair/:roomId", matchController.deletePair)
matchRouter.get("/pair", matchController.getAllPairs)
matchRouter.get("/getRoomId/:username", matchController.getRoomId)
matchRouter.put("/editByRoom/:roomId", matchController.putQuestionByRoomId)
matchRouter.get("/getQuestionId/:roomId", matchController.getQuestionByRoomId)

module.exports = matchRouter