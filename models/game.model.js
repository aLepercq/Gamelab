const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        version: {
            type: String,
            required: true,
        },
        price: {
            type: [
                {
                    isfree: Boolean,
                    value: Number,
                }
            ],
            required: true,
        },
        pegi: {
            type: Number,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        tags: {
            type: [String],
            required: true,
        },
        buyers: {
            type: [String],
            required: true,
        },
        reviews: {
            type: [
                {
                    reviewerId: String,
                    reviewerPseudo: String,
                    text: String,
                    note: Number,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('game', GameSchema);