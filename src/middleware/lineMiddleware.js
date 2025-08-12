const crypto = require('crypto');

function verifyLineSignature(req, res, next) {
    const signature = req.headers['x-line-signature'];
    
    if (!signature) {
        console.log('Missing X-Line-Signature header');
        return res.status(401).json({ error: 'Missing X-Line-Signature header' });
    }

    // 使用原始 body 字串
    const body = req.rawBody;
    
    const expectedSignature = crypto
        .createHmac('SHA256', process.env.CHANNEL_SECRET)
        .update(body, 'utf8')
        .digest('base64');

    const expectedSignatureWithPrefix = `SHA256=${expectedSignature}`;
    
    console.log('Received signature:', signature);
    console.log('Expected signature:', expectedSignatureWithPrefix);
    console.log('Channel Secret:', process.env.CHANNEL_SECRET ? 'Set' : 'Not set');

    if (signature !== expectedSignatureWithPrefix) {
        console.log('Signature verification failed');
        return res.status(401).json({ error: 'Invalid signature' });
    }

    console.log('Signature verified successfully');
    next();
}

module.exports = { verifyLineSignature };
