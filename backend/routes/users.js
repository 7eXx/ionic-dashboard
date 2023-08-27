const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const dateFormatter = require("../utils/data-formatter");
const { boolean } = require("joi");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ 
                errorMessage: error.details[0].message
            });
        }

        const findUser = await User.findOne({email: req.body.email});
        if (findUser) {
            return res.status(400).send({ errorMessage: "User already exists!" });
        }

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        user.creationDatetime = dateFormatter.formatCustom(new Date());

        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find();

        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.put("/status", auth, async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('enabled')) {
            return res.status(400).send({errorMessage: 'Change status missing arguments'});
        }
        if (!req.body.enabled instanceof boolean) {
            return res.status(400).send({errorMessage: 'Enable argument type not valid'});
        }

        const findUser = await User.findById(req.body.id);
        if (!findUser) {
            return res.status(400).send({errorMessage: 'User not found'});
        }
        if (findUser.id === req.session.user._id) {
            return res.status(400).send({errorMessage: 'Cannot change status for current user'});
        }

        findUser.enabled = req.body.enabled;
        await findUser.save();

        res.send(findUser);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

module.exports = router;