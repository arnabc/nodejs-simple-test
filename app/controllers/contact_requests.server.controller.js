'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ContactRequest = mongoose.model('ContactRequest'),
    Errors = require('./errors.server.controller'),
    Config = require('../../config/config'),
    Nodemailer = require('nodemailer'),
    Async = require('async'),
    _ = require('lodash');


// create a transport to send emails

var transport;

if (process.env.NODE_ENV === 'development') {
    // use direct transport
    var mOptions = Config.mailer.options;
    mOptions.name = 'localhost';

    transport = Nodemailer.createTransport(require('nodemailer-direct-transport')(mOptions));
} else {
    transport = Nodemailer.createTransport(Config.mailer.options);
}


/**
 * Generic error handler, extracts the message from the error object and returns it
 *
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 * @param  {Error} err Error object to handle
 */
var genericErrorHandler = function (req, res, err) {
    res.status(422).send( {
        code: 422,
        message: Errors.getErrorMessage(err)
    } );
};

/**
 * Index "/" route handler
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 */
exports.index = function(req, res) {
    ContactRequest.find({}, function (err, reqs) {
        if (err) {
            return res.render('contact_requests', {
                data: reqs,
                request: req
            });
        }

        res.render('contact_requests', {
            data: _.filter(reqs, 'name'), // filter valid items
            request: req
        });
    });
};

/**
 * Creates a contact request form
 *
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 */
exports.create = function (req, res, next) {
    // validate and save the contact request
    var model = new ContactRequest(req.body);

    // use async waterfall once the contact request has been saved
    // send an email to the Admin to notify
    Async.waterfall([
        function (done) {
            model.save(function (err, data) {
                if (err) {
                    // handle error
                    return genericErrorHandler(req, res, err);
                }

                done(err, data);
            });
        },

        // prepare mail template
        function (data, done) {
            res.render('templates/email_notification', data, function (err, html) {
                done(err, html, data);
            });
        },

        // send mail
        function (html, data, done) {
            var options = {
                to: Config.mailer.to,
                from: data.email, // so that the admin can reply-to the user
                subject: data.subject,
                html: html
            };

            transport.sendMail(options, function (err) {
                if (!err) {
                    res.format({
                        // if a request is made to obtain JSON
                        json: function () {
                            res.send(data);
                        },

                        // default content handler
                        default: function () {
                            res.render('index', {
                                request: req
                            });
                        }
                    });
                } else {
                    res.format({
                        // if a request is made to obtain JSON
                        json: function () {
                            res.status(422).send({
                                code: 422,
                                message: 'Failure sending email'
                            });
                        },

                        // default content handler
                        default: function () {
                            res.render('index', {
                                request: req
                            });
                        }
                    });
                }

                done(err);
            });
        }],
        // final callback
        function (err) {
            if (err) return next(err);
        });
};
