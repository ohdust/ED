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
    if(Object.keys(body).length === 0 || body === null || body === undefined) {
        const err = new Error('data is empty');
        next(err);
    }
    next();
}

function isId(req, res, next){
    const body = req.params.id;
    if(body.length === 0 || body === null || body === undefined){
        const err = new Error('data is empty');
        next(err);
    }
    next();
}

module.exports = {
    passwordValidator,
    isEpty,
    isId,
};
