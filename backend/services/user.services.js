const { generateAccessToken } = require('./tokenGenerator.services');

const createUser = async (repository, login, password) => {
    return repository.userRegistration(login, password); 
};

const postAuthData = async (repository, login, password) => {
    const response = await repository.signIn(login, password);
    
    const token = generateAccessToken({
        login: response.login,
        userid: response.user_id
    });
    const userid = response.user_id;
    return {token: `${token}`, login: `${login}`, userid: `${userid}`};
};

module.exports = {
    createUser,
    postAuthData,
};