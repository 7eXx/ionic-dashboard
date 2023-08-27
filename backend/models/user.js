const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { string } = require("joi");
const dateFormatter = require("../utils/data-formatter");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    creationDatetime: {
        type: String,
        required: true
    },
    lastLoginDatetime: {
        type: String,
        default: ''
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model("users", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        creationDatetime: Joi.string(),
        lastLoginDatetime: Joi.string(),
        enabled: Joi.boolean(),
    });
    return schema.validate(user);
};

module.exports = { User, validate };