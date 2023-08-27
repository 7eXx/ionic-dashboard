const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        default: ''
    },
    creationDatetime: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
});

const Item = mongoose.model("items", itemSchema);

const validate = (item) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        link: Joi.string(),
        creationDatetime: Joi.string(),
        published: Joi.boolean()
    });
    return schema.validate(item);
};

module.exports = { Item, validate };