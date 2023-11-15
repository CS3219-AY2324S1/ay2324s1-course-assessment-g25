const { Match, Pair } = require('../models');
/* const { axios } = require('axios') */
const { Op } = require('sequelize');

const getPairByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const pair = await Pair.findOne({
            where: {
                [Op.or]: [
                    { username1: username },
                    { username2: username }
                ],
            }
        })
        if (pair instanceof Pair) {
            res.status(200).json({ res: pair })
        } else {
            res.status(404).json({ error: 'You do not have a pair' })
        }
    } catch (err) {
        next(err)
    }
}

const getPairByRoomId = async (req, res, next) => {
    try {
        const id = req.params.roomId;
        const pair = await Pair.findOne({
            where: { roomId: id }
        })
        if (!pair) {
            res.status(404).json({ error: 'This pair does not exist!' })
        }
        res.status(200).json({ res: pair })
    } catch (err) {
        next(err)
    }
}

const getAllPairs = async (req, res, next) => {
    try {
        const pairList = await Pair.findAll();
        res.status(200).json({ res: pairList })
    } catch (err) {
        next(err)
    }
}



const getRoomId = async (req, res, next) => {
    try {
        const username = req.params.username
        const pair = await Pair.findOne({
            where: {
                [Op.or]: [
                    { username1: username },
                    { username2: username }
                ]
            }
        })
        res.status(200).json({ res: pair.roomId })
    } catch (err) {
        next(err)
    }
}

const addPair = async (req, res, next) => {
    try {
        const { username1, username2, complexity, roomId } = req.body
        const pair = await Pair.create({
            username1: username1,
            username2: username2,
            complexity: complexity,
            roomId: roomId
            //question: qn_id,
        });
        res.status(200).json({ res: pair })
    } catch (err) {
        next(err)
    }
}

const putQuestionByRoomId = async (req, res, next) => {
    try {
        const { roomId, questionId } = req.body;

        const pair = await Pair.findOne({
            where: { roomId: roomId }
        });

        if (!pair) {
            return res.status(404).json({ error: "Pair not found" });
        }

        pair.questionId = questionId;

        await pair.save();

        res.status(200).json({ success: true, pair: pair });
    } catch (err) {
        next(err);
    }
};

const getQuestionByRoomId = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const pair = await Pair.findOne({
            where: { roomId: roomId }
        });

        if (!pair) {
            return res.status(404).json({ error: "Pair not found" });
        }

        /* if (pair.questionId == null) {
            return res.status(404).json({ error: "Session does not have a questionId" });
        } */
        res.status(200).json({res: pair.questionId})
    } catch (err) {
        next(err)
    }
}

/* const endSession = async (req, res, next) => {
    try {
        const id = req.params.roomId;
        const pair = await Pair.findOne({
            where: { roomId: id }
        })
        if (pair) {
            pair.roomId = id;
            await pair.save();
            res.status(200).json({ res: pair })
        } else {
            res.status(404).json({error: 'This pair does not exist!'})
        }
    } catch (err) {
        next(err)
    }
} */

const deletePair = async (req, res, next) => {
    console.log('DELETE PAIR', req.params.roomId)
    try {
        const id = req.params.roomId
        const pair = await Pair.findOne({
            where: {
                roomId: id
            }
        })
        if (!pair) {
            res.status(404).json({ error: 'Pair is not found' })
        }
        await Pair.destroy({
            where: {
                roomId: id
            }
        })
        res.status(200).json({ res: 'pair is deleted' })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getPairByUsername,
    deletePair,
    getAllPairs,
    addPair,
    getPairByRoomId,
    getRoomId,
    putQuestionByRoomId,
    getQuestionByRoomId
}


