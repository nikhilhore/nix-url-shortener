const express = require('express');
const router = express.Router();
const path = require('path');
const { nanoid } = require('nanoid');
const LongUrlAndShortId = require('./../models/LongUrlAndShortId');

const site = "https://nix-us.herokuapp.com/";

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.post('/convertLongUrlToShort', async (req, res) => {
    const { longUrl } = req.body;
    let shortUrl = site;
    const result = await LongUrlAndShortId.findOne({ longUrl }).exec();
    if (result == null) {
        const shortId = nanoid(15);
        shortUrl += shortId;
        new LongUrlAndShortId({ longUrl, shortId }).save();
    }
    else {
        shortUrl += result.shortId;
    }
    res.json({ shortUrl });
});

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const result = await LongUrlAndShortId.findOne({ shortId }).exec();
    let longUrl = site;
    if (result != null) {
        longUrl = result.longUrl;
    }
    res.redirect(longUrl);
});

module.exports = router;