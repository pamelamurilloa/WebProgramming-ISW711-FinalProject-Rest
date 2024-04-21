const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlist = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: String
    },
    kids: [{ type: Schema.Types.ObjectId, ref: 'Kid' }],
    videos: [{
        name: {
            required: true,
            type: String
        },
        url: {
            required: true,
            type: String
        }    
    }]
})

module.exports = mongoose.model('Playlist', playlist);