const express = require('express');
const router = express.Router();
const path = require('path');
const { nanoid } = require('nanoid');
const LongUrlAndShortId = require('./../models/LongUrlAndShortId');

const site = "https://nix-us.herokuapp.com/";

router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    } catch (e) {
        res.send('There was some error while accessing this site');
    }
});

router.post('/convertLongUrlToShort', async (req, res) => {
    try {
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
    } catch (err) {
        res.json({ shortUrl: "", err })
    }
});

router.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const result = await LongUrlAndShortId.findOne({ shortId }).exec();
        let longUrl = site;
        if (result != null) {
            longUrl = result.longUrl;
        }
        res.redirect(longUrl);
    } catch (err) {
        res.json({ shortUrl: "", err })
    }
});

module.exports = router;