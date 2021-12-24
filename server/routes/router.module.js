const express = require('express');
const router = express.Router();
const { authorization, doRegistration, authentification } = require('../controller/user.constroller');
const { authenticateToken } = require('../middleware/tokenValidator');
const { 
    getRooms, 
    createChat, 
    deleteRoomById, 
    getMessagesByRoomId,
    delMes 
} = require('../controller/chat.controller');

router.post('/registration', doRegistration);
router.post(`/authorize`, authorization);
router.get('/auth',authenticateToken, authentification);

router.get('/chat', authenticateToken, getRooms);
router.get('/chat/:id', authenticateToken, getMessagesByRoomId);
router.post('/chat', authenticateToken, createChat);
router.delete('/chat/:roomId', authenticateToken, deleteRoomById);

router.get('/del', delMes);
//router.post('`/chat', authenticateToken, addMessage);


module.exports = router;