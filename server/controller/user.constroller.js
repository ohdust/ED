const { createUser,postAuthData } = require("../services/user.services");
const repository = require("../repository/postgresql.repository");

const doRegistration = async (req , res) => {
    const {login, password} = req.body;
    try {
        const user = await createUser(repository, login, password);
        res.status(201).json(user);
    } catch(e) {
        res.status(400).send(`${e}`);
    }
};

const authorization = async (req, res) => {
    const {login, password} = req.body;
    try {
        const user = await postAuthData(repository, login, password);
        res.status(200).send(user);
    } catch(e) {
        res.status(401).send(`${e}`);
    }
};

const authentification = async (req, res) => {
    const user = {user:req.user, userid:req.userid};
    res.status(200).json(user); 
    
};

module.exports = {
    doRegistration,
    authorization,
    authentification,
};