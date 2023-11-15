const { AttemptedQuestions } = require('../models');
const { Op } = require('sequelize');

const addQuestions = async (req, res, next) => {
    try {
        const { roomId, username, questionId } = req.body;

        const now = new Date();
        const singaporeTime = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Singapore' });

        console.log(`${singaporeTime.format(now)}`)

        if (!roomId, !username, !questionId) {
            res.status(400).json({ error: "Missing field" });
            return;
        }

        const count = await AttemptedQuestions.findOne({
            where: {
                roomId: roomId,
                username: username,
            },
        });


        if (count instanceof AttemptedQuestions) {
            res.status(400).json({ error: "Session has ended!" });
            return;
        }

        const attemptedQuestion = await AttemptedQuestions.create({
            roomId: roomId,
            username: username,
            questionId: questionId,
        });

        res.status(200).json({ res: attemptedQuestion });
    } catch (err) {
        next(err);
    }
};

const getHistoryByUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const questionList = await AttemptedQuestions.findAll({ where: { username: username } });
        if (!questionList) {
            res.status(404).json({ error: "Question does not exist!" });
            return;
        }
        res.status(200).json({ res: questionList });
    } catch (err) {
        next(err);
    }
}

const getHistoryByRoomId = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const questionList = await AttemptedQuestions.findAll({ where: { roomId: roomId } });
        if (!questionList) {
            res.status(404).json({ error: "Question does not exist!" });
            return;
        }
        res.status(200).json({ res: questionList });
    } catch (err) {
        next(err);
    }
}

const getHistoryByQuestionId = async (req, res, next) => {
    try {
        const questionId = req.params.questionId;
        const questionList = await AttemptedQuestions.findAll({ where: { questionId: questionId } });
        if (!questionList) {
            res.status(404).json({ error: "Question does not exist!" });
            return;
        }
        res.status(200).json({ res: questionList });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getHistoryByQuestionId,
    getHistoryByRoomId,
    getHistoryByUser,
    addQuestions
}