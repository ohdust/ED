const { 
    getAllChats, 
    createChatroom, 
    updateChatStatus, 
    getChatsMembers,
    postMessage 
} = require('../services/chat.services');



const getChats = async (req, res) => {
    try {
        const chats = await getAllChats();
        res.status(200).send(chats);
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

const addMessage = async (message) => {
    //const { message } = req.body;

    try{
        await postMessage(message);
        
        // res.status(200).send(sendMessage);
    } catch(e) {
        console.log(`${e}`);
    }
};

module.exports ={
    getChats,
    createChat,
    changeChatstatus,
    getChatMembersByChatId,
    addMessage,
};