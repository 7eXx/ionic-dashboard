const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const auth = require("../middleware/auth");
const dateFormatter = require("../utils/data-formatter");
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        if (req.session && req.session.user) {
            return res.status(400).send({ errorMessage: "User already logged" });
        }

        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send({ errorMessage: "Email not found" });
        }

        if (!user.enabled) {
            return res.status(400).send({ errorMessage: "User is not enabled" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(400).send({ errorMessage: "Invalid email or password" });
        }

        user.lastLoginDatetime = dateFormatter.formatCustom(new Date());
        user.save

        req.session.user = {
            _id: user._id,
            email: user.email
        };

        res.send({ id: user._id, email: user.email });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.get("/logout", auth, async (req, res, next) => {
    req.session.destroy((err) => {
        console.log("Destroyed session");
    });

    res.send({ state: "logout" });
});

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = router;