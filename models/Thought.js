const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const dateFormat = require('../utils/date');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
            min_length: 1
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (data) => new Date(data)
        },

        username: {
            type: String,
            required: true
        },

    reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;