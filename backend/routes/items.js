const express = require("express");
const auth = require("../middleware/auth");
const { Item, validate } = require("../models/item");
const dateFormatter = require("../utils/data-formatter");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        const items = await Item.find().sort({ creationDatetime: -1 });

        res.send(items);
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

        const item = new Item(req.body);
        item.creationDatetime = dateFormatter.formatCustom(new Date());

        await item.save();

        res.send(item);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

router.delete("/", auth, async (req, res) => {
    if (!req.body.hasOwnProperty('id')) {
        return res.status(400).send({errorMessage: 'Missing property'});
    }

    const findItem = await Item.findById(req.body.id);
    if (!findItem) {
        return res.status(400).send({errorMessage: 'Item not found'});
    }

    await Item.findByIdAndDelete(findItem._id);

    res.send();
});

router.put("/publish", auth, async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('published')) {
            return res.status(400).send({errorMessage: 'Change status missing arguments'});
        }
        if (!(typeof req.body.published === 'boolean')) {
            return res.status(400).send({errorMessage: 'Argument type not valid'});
        }

        const findItem = await Item.findById(req.body.id);
        if (!findItem) {
            return res.status(400).send({errorMessage: 'Item not found'});
        }

        findItem.published = req.body.published;
        await findItem.save();

        res.send(findItem);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: error.message });
    }
});

module.exports = router;