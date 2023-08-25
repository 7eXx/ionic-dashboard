const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(400).send("Username not found");
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(400).send("Invalid username or password");
        }

        const token = user.generateAuthToken();
        res.send(token);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

const validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = router;