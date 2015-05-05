'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    ContactRequest = mongoose.model('ContactRequest');

/**
 * Globals
 */
var contactReq, contactReq2;

/**
 * Unit tests
 */
describe('ContactRequest Model Unit Tests:', function() {
    before(function(done) {
        contactReq = new ContactRequest({
            name: 'Arnab C',
            email: 'test@promobitech.com',
            subject: 'This is test subject',
            body: 'Lorem ipsam dolor...',
        });
        contactReq2 = new ContactRequest({
            name: 'Arnab C2',
            email: 'test2@promobitech.com',
            subject: 'This is another test subject',
            body: 'Lorem ipsam dolor sit amet...',
        });

        done();
    });

    describe('Validate Model Save', function() {
        it('should begin with no contact requests', function(done) {
            ContactRequest.find({}, function(err, contactRequests) {
                contactRequests.should.have.length(0);
                done();
            });
        });

        it('should be able to save without problems', function(done) {
            contactReq.save(done);
        });

        it('should be able to show an error when try to save without name', function(done) {
            contactReq.name = '';
            return contactReq.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without email', function(done) {
            contactReq.email = '';
            return contactReq.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save invalid email', function(done) {
            contactReq.email = 'email-invalid';
            return contactReq.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without subject', function(done) {
            contactReq.subject = '';
            return contactReq.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without body', function(done) {
            contactReq.body = '';
            return contactReq.save(function(err) {
                should.exist(err);
                done();
            });
        });


    });

    after(function(done) {
        ContactRequest.remove().exec();
        done();
    });
});
