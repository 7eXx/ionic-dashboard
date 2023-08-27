const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const noteSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: '',
    },
    creationDatetime: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        default: '',
    }
});

const Note = mongoose.model("notes", noteSchema);

const validate = (note) => {
    const schema = Joi.object({
        title: Joi.string().optional().allow(''),
        description: Joi.string().optional().allow(''),
        color: Joi.string().optional().allow(''),
        creationDatetime: Joi.string(),
        owner: Joi.string(),
    });
    return schema.validate(note);
};

module.exports = { Note, validate };