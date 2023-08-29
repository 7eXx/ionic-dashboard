
module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).send({ 
            errorMessage: "User is not logged" 
        });
    }
};