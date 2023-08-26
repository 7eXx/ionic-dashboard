const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema = new Schema({
    email: {
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

const User = mongoose.model("users", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        enabled: Joi.boolean()
    });
    return schema.validate(user);
};

module.exports = { User, validate };