"use strict";
require('dotenv').config();
module.exports = {
    allowedOrigins: ['http://localhost:3000/'],
    SERVER_PORT: process.env.PORT || 3000,
    SERVER_DB_URI: process.env.DB_URI,
    JWT_SECRET: 'thisIsASimpleTest',
    OTP_LENGTH: 6,
    OTP_CONFIG: {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    },
    MAIL_SETTINGS: {
        service: 'gmail',
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD,
        },
    },
};
