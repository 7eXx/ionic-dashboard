const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        if (req.session && req.session.user) {
            return res.status(400).send("User already logged");
        }

        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send("Email not found");
        }

        if (!user.enabled) {
            return res.status(400).send("User is not enabled");
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(400).send("Invalid email or password");
        }

        req.session.user = {
            _id: user._id,
            email: user.email
        };

        res.send("User logged in successfully!!!");
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

router.get("/logout", auth, async (req, res, next) => {
    req.session.destroy((err) => {
        console.log("Destroyed session");
    });

    res.send("User logged out");
});

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = router;