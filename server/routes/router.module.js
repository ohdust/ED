const express = require('express');
const router = express.Router();
const { authorization,
    doRegistration,
    authentification,
} = require('../controller/user.constroller');
const { authenticateToken } = require('../middleware/tokenValidator'),
    validator = require('../middleware/dataValidator.js');
const { 
    getRooms, 
    createChat, 
    deleteRoomById, 
    getMessagesByRoomId,
    deleteMessageById,
    changeRoomStatus,
} = require('../controller/chat.controller');

router.post('/registration', doRegistration);
router.post(`/authorize`, authorization);
router.get('/auth',authenticateToken, authentification);

router.get('/chat', authenticateToken, getRooms);
router.get('/chat/:id', authenticateToken, getMessagesByRoomId);
router.post('/chat', authenticateToken, validator.isEpty, createChat);
router.delete('/chat/status/:roomId',  authenticateToken, changeRoomStatus);
router.delete('/chat/:roomId', authenticateToken, deleteRoomById);

//router.get('/chat/messages', authenticateToken, getMesCounts);
router.delete('/chat/messages/:messId', authenticateToken, deleteMessageById);


module.exports = router;