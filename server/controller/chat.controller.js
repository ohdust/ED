const { 
    getAllRooms,
    getMessages, 
    createChatroom, 
    updateChatStatus, 
    getChatsMembers,
    postMessage,
    deleteRoom,
    getMessagesCounts,
    deleteMessage,

} = require('../services/chat.services');



const getRooms = async (req, res) => {
    try {
        const chats = await getAllRooms();
        res.status(200).send(chats);
    } catch(e) {
        res.status(404).send(`${e}`);
    }  
};

const getMessagesByRoomId = async (req, res) => {
    const roomId = req.params.id;
    try{
        const room = await getMessages(roomId);
        return res.status(200).send(room.messages);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const createChat = async (req, res) => {
    const {name, user_id} = req.body;
    try {
        const chat = await createChatroom(name, user_id);
        return res.status(200).send(chat);
    } catch(e) {
        res.status(500).json(`${e}`);
    }
};

const changeChatstatus = async (req, res) => {
    const {closed, room_id} = req.body;

    try {
        const chatLock = await updateChatStatus(closed, room_id);
        res.status(200).send(chatLock);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const getChatMembersByChatId = async (req, res) => {
    const {room_id} = req.body;

    try {
        const chatMembers = await getChatsMembers(room_id);
        res.status(200).send(chatMembers);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const addMessage = async (roomId, message) => {
    try{
        await postMessage(roomId, message);
    } catch(e) {
        console.log(`${e}`);
    }
};

const deleteRoomById = async (req, res) => {
    const room_id = req.params?.roomId;
    try{
        await deleteRoom(room_id);
        res.status(204).send(`room ${room_id} deleted`);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const getMesCounts = async (req, res) => {
    try{
        const counts = await getMessagesCounts();
        res.status(200).send(counts);
    } catch(e) {
        res.status(404).send(`${e}`);
    }
};

const deleteMessageById = async (req, res) => {
    const messageId = req.params?.messId;
    try{
        const mes = await deleteMessage(messageId);
        res.status(204).send(mes);
    } catch(e) {
        res.status(204).send(`${e}`);
    }
};

module.exports = {
    getRooms,
    getMessagesByRoomId,
    createChat,
    changeChatstatus,
    getChatMembersByChatId,
    addMessage,
    deleteRoomById,
    getMesCounts,
    deleteMessageById,  
};