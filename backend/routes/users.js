const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const findUser = await User.findOne({email: req.body.email});
        if (findUser) {
            return res.status(400).send("User already exists!");
        }

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find();

        res.send(users);
    } catch (error) {
        console.log(error);
        res.send("An error occurred");
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).select("-password -__v");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

module.exports = router;