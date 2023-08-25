const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    return token;
};

const User = mongoose.model("users", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = { User, validate };