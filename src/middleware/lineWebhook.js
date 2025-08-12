const crypto = require('crypto');
const { CHANNEL_SECRET } = require('../utils/config');

const verifySignature = (req, res, next) => {
    const signature = req.headers['x-line-signature'];
    const body = JSON.stringify(req.body);
    const hash = crypto
        .createHmac('SHA256', CHANNEL_SECRET)
        .update(body)
        .digest('base64');

    if (signature !== hash) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = {
    verifySignature,
};