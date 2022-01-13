const getAllRooms = async (repository) => {
    return repository.getAllRooms();
};

const createChatroom = async (repository, name, userId) => {
    return repository.createRoom(name, userId);   
};

const updateRoomStatus = async (repository, roomId) => {
    return repository.updateRoom(roomId); 
};

const deleteRoom = async (repository,roomId) => {
    return repository.deleteRoom(roomId);
};

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
    postMessage,
    deleteRoom,
    deleteMessage,
};