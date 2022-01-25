const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
 
    if(token == null){
        return res.status(401).send('empty token');
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) return res.status(401).send(err);
            req.user = user.login;
            req.userid = user.userid;
            next();
        });
    } 
}

module.exports = {
    authenticateToken
};