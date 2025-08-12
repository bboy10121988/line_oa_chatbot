const crypto = require('crypto');

function verifyLineSignature(req, res, next) {
    const signature = req.headers['x-line-signature'];
    
    if (!signature) {
        return res.status(401).json({ error: 'Missing X-Line-Signature header' });
    }

    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
        .createHmac('SHA256', process.env.CHANNEL_SECRET)
        .update(body)
        .digest('base64');

    if (signature !== `SHA256=${expectedSignature}`) {
        return res.status(401).json({ error: 'Invalid signature' });
    }

    next();
}

module.exports = { verifyLineSignature };
