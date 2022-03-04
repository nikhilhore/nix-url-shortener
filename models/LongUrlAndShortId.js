const mongoose = require('mongoose');

const longUrlAndShortIdSchema = mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true
    }
});

const LongUrlAndShortId = new mongoose.model('LongUrlAndShortId', longUrlAndShortIdSchema);

module.exports = LongUrlAndShortId;