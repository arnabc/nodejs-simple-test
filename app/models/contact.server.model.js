'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Contact Request Schema
 */
var ContactRequestSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please fill in your name'
    },
    subject: {
        type: String,
        trim: true,
        required: 'Please fill in a subject'
    },

    email: {
        type: String,
        trim: true,
        required: 'Please fill in your email',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },

    body: {
        type: String,
        trim: true,
        required: 'Please fill in your message',
    },

    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('ContactRequest', ContactRequestSchema);
