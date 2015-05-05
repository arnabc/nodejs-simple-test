'use strict';

module.exports = function(app) {
    // Contact Request Routes
    var contactRequests = require('../../app/controllers/contact_requests.server.controller');

    // Setting up the users profile api
    app.route('/contact_requests.:format?').get(contactRequests.index);
    app.route('/contact_requests.:format?').post(contactRequests.create);


    // Finish by binding the user middleware
    // app.param('email', contactRequests.userByEmail);
};
