const { 
    getAllRooms,
    getMessages, 
    createChatroom, 
    updateRoomStatus, 
    getChatsMembers,
    postMessage,
    deleteRoom,
    deleteMessage,

} = require('../services/chat.services');
const postgresRep = require('../repository/postgresql.repository');



const getRooms = async (req, res) => {
    try {
        const chats = await getAllRooms(postgresRep);
        res.status(200).send(chats);
    } catch(e) {
        res.status(404).send(`${e}`);
    }  
};

const getMessagesByRoomId = async (req, res) => {
    const roomId = req.params.id;
    try{
        const room = await getMessages(postgresRep, roomId);
        return res.status(200).send(room.messages);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const createChat = async (req, res) => {
    const {name, user_id} = req.body;
    try {
        const chat = await createChatroom(postgresRep, name, user_id);
        return res.status(200).send(chat);
    } catch(e) {
        res.status(500).json(`${e}`);
    }
};

const changeRoomStatus = async (req, res) => {
    const { roomId } = req.body;
    try {
        const chatLock = await updateRoomStatus(postgresRep, roomId);
        res.status(20).send(chatLock);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const deleteRoomById = async (req, res) => {
    const room_id = req.params?.roomId;
    try{
        await deleteRoom(postgresRep, room_id);
        res.status(204).send(`room ${room_id} deleted`);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const getChatMembersByChatId = async (req, res) => {
    const {room_id} = req.body;

    try {
        const chatMembers = await getChatsMembers(postgresRep, room_id);
        res.status(200).send(chatMembers);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const addMessage = async (roomId, message) => {
    try{
        await postMessage(postgresRep, roomId, message);
    } catch(e) {
        console.log(`${e}`);
    }
};

const deleteMessageById = async (req, res) => {
    const messageId = req.params?.messId;
    try{
        const mes = await deleteMessage(postgresRep, messageId);
        res.status(204).send(mes);
    } catch(e) {
        res.status(204).send(`${e}`);
    }
};

module.exports = {
    getRooms,
    getMessagesByRoomId,
    createChat,
    changeRoomStatus,
    getChatMembersByChatId,
    addMessage,
    deleteRoomById,
    deleteMessageById,  
};