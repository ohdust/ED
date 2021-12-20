const db = require('../models/db/db');
const { generateAccessToken } = require('./tokenGenerator.services');

const userRegistration = async (login, password) => {
    const response = await db.query(`
        INSERT INTO chatuser (login, password)
        VALUES($1, $2)
        RETURNING login;`, [login, password]);
    if(response.rows[0].length === 0) throw new Error('user not created'); 
    return response.rows[0];
};

const signIn = async (login, password) => {
    const response = await db.query(`
    SELECT login, user_id
    FROM chatuser
    WHERE login = $1 AND password = $2;`, [login, password]);

    if(response.rows.length === 0) throw new Error('user not found');
    
    const token = generateAccessToken({
        login: response.rows[0].login,
        userid: response.rows[0].user_id
    });
    const userid = response.rows[0].user_id;
    return {token: `${token}`, login: `${login}`, userid: `${userid}`};
};

module.exports = {
    userRegistration,
    signIn,
};