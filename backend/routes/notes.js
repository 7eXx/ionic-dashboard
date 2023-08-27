
const express = require("express");
const auth = require("../middleware/auth");
const { Note, validate } = require("../models/note");
const dateFormatter = require("../utils/data-formatter");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.session.user._id });

        res.send(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.post("/", auth, async (req, res) => { 
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ 
                errorMessage: error.details[0].message
            });
        }

        const note = new Note(req.body);
        note.creationDatetime = dateFormatter.formatCustom(new Date());
        note.userId = req.session.user._id;
        note.owner = req.session.user.email;

        await note.save();

        res.send(note);

    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.put("/", auth, async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('id')) {
            return res.status(400).send({errorMessage: 'Missing property'});
        }

        const requestId = req.body.id;
        delete req.body.id;

        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ 
                errorMessage: error.details[0].message
            });
        }

        const findNote = await Note.findById(requestId);
        if (!findNote) {
            return res.status(400).send({errorMessage: 'Note not found'});
        }

        findNote.title = req.body.title;
        findNote.description = req.body.description;
        findNote.color = req.body.color; 
        await findNote.save();

        res.send(findNote);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.delete("/", auth, async (req, res) => {
    if (!req.body.hasOwnProperty('id')) {
        return res.status(400).send({errorMessage: 'Missing property'});
    }
    const findNote = await Note.findById(req.body.id);
    if (!findNote) {
        return res.status(400).send({errorMessage: 'User not found'});
    }

    await Note.findByIdAndDelete(findNote._id);

    res.send();
});

module.exports = router;