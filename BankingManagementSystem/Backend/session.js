const crypto = require('crypto');

const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
};

const session = require('express-session');

const setupSession = () => {
    return session({
        secret: generateSecretKey(),
        resave: false,
        saveUninitialized: false
    });
};

module.exports = { generateSecretKey, setupSession };
