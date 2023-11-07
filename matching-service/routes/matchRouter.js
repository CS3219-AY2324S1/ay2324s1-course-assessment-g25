const express = require('express')
const matchController = require("../controllers/matchController");
const matchRouter = express.Router();

matchRouter.post("/", matchController.addPair)
matchRouter.get("/getPair/:username", matchController.getPairByUsername)
matchRouter.get("/getPair/:roomId", matchController.getPairByRoomId)
matchRouter.delete("/deletePair/:username", matchController.deletePair)
matchRouter.get("/pair", matchController.getAllPairs)
matchRouter.get("/getRoomId", matchController.getRoomId)

module.exports = matchRouter