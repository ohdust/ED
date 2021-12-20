const db = require('../models/db/db');


// const getAllChats = async () => {
//     const response = await db.query(`
//         SSELECT  name, closed, messages
//         FROM chatmembers
//        	FULL JOIN chatuser ON chatuser.user_id = chatmembers.user_id
// 		FULL JOIN chatroom ON chatroom.room_id  = chatmembers.room_id;
//         `);
//     if(response.rows[0].length === 0) throw new Error('no chats found');
//     return response.rows[0];
// };

const getAllChats = async () => {
    const response = await db.query(`
        SELECT room_id, name, messages, creater_id, closed
        FROM chatroom
    ;`);
    if(response.rows.length === 0) throw new Error('no chats found');
    return response.rows;
};

// const getRoomById = async () => {
//     const response = await db.query(`
//     SELECT 
//     `);
// };

const createChatroom = async (name, user) => {
    const response = await db.query(`
        INSERT INTO chatroom (name, creater_id)
        VALUES($1, $2)
        RETURNING name, creater_id;
    `, [name, user]);
    if(!response.rows[0]) throw new Error('chat not created');
    return response.rows[0];
};


const updateChatStatus = async (status, id) => {
    const response = await db.query(`
        UPDATE chatroom
        SET closed = $1
        WHERE id = $2
        RETURNING closed;
    `, [status, id]);
    if(!response.rows[0]) throw new Error('messsage not exist');
    return response.rows[0];
};

const getChatsMembers = async (chatId) => {
    const response = await db.query(`
        SELECT login
        FROM chatmembers
        INNER JOIN chatuser ON chatuser.user_id = chatmembers.user_id
        INNER JOIN chatroom ON chatroom.chatroom_id = chatmembers.room_id
        WHERE room_id = $1;
    `, [chatId]);
    if(!response.rows[0]) throw new Error('chat not found');
    return response.rows[0];
};

const postMessage = async (message) => {
    const response = await db.query(`
        INTSERT INTO chatroom (messages)
        VALUES($1)
        WHERE room_id = $2
        RETURNING messages
    ;`, [message, message.roomId]);
    if(response.rows[0].length === 0) throw new Error('somthing went wrong');
    return response.rows[0];
};

module.exports = {
    getAllChats,
    createChatroom,
    updateChatStatus,
    getChatsMembers,
    postMessage,
};