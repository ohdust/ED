const getAllRooms = async (repository) => {
    return repository.getAllRooms();
};

const createChatroom = async (repository, name, user) => {
    return repository.createRoom(name, user);   
};

const updateRoomStatus = async (repository, roomId) => {

    return repository.updateRoom(roomId); 
};

const deleteRoom = async (repository,roomId) => {
    return repository.deleteRoom(roomId);
};

// const getChatsMembers = async (chatId) => {
//     const response = await db.query(`
//         SELECT login
//         FROM chatmembers
//         INNER JOIN chatuser ON chatuser.user_id = chatmembers.user_id
//         INNER JOIN chatroom ON chatroom.chatroom_id = chatmembers.room_id
//         WHERE room_id = $1;
//     `, [chatId]);
//     if(!response.rows[0]) throw new Error('chat not found');
//     return response.rows[0];
// };

const getMessages = async (repository, roomId) => {
    return repository.getMessages(roomId);
}; 

const postMessage = async (repository, roomId, message) => {
    return repository.createMessage(roomId, message);
    
};

const deleteMessage = async (repository, messId) => {
    return repository.deleteMessage(messId);
    
};

module.exports = {
    getAllRooms,
    getMessages,
    createChatroom,
    updateRoomStatus,
    //getChatsMembers,
    postMessage,
    deleteRoom,
    deleteMessage,
};