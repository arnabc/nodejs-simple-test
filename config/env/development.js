'use strict';

module.exports = {
    db: 'mongodb://localhost/luma-dev',
    app: {
        title: 'Luma - Development Environment'
    },

    mailer: {
        from: process.env.MAILER_FROM || 'default-user@mailinator.com',
        to: process.env.MAILER_TO || 'lumadmin_default_promobi@mailinator.com',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
            }
        }
    }
};
