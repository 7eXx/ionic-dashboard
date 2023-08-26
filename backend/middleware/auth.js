
module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(400).send("User is not logged");
    }
};