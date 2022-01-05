function passwordValidator (req, res, next) {
    const body = req.body?.password;

    if(Object.keys(body)?.length === 0 || body?.length > 20 || body?.length < 6 || body === null || body === undefined){
        const err = new Error('the password must have 6 or more symbols');
        err.statusCode = 401;
        next(err);
    }
    next();
}

function isEpty (req, res, next) {
    const body = req.body;
    if(Object.values(body).length === 0 || body === null || body === undefined || body.name === '') {
        const err = new Error('data is empty');
        res.status(400).send({message: 'data is empty'});
        next(`${err}`);
    }
    next();
}

function minLength (req, res, next) {
    const {login, password} = req.body;
    if(login.length < 5 || password.length < 5){
        const err = new Error('minimal length error');
        res.status(400).send({message:"invalid input data"});
        next(err);
    }
    next();
}

function isString(roomId, message){
    if(typeof roomId !== "string") return(false);
    for(let key in message ){
        if(typeof message[key] !== "string"){
            return false;
        }
        return true;
    }
}

module.exports = {
    passwordValidator,
    isEpty,
    isString,
    minLength
};
