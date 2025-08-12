require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { verifyLineSignature } = require('./middleware/lineMiddleware');
const lineController = require('./controllers/lineController');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(bodyParser.json());

// 健康檢查端點
app.get('/', (req, res) => {
    res.json({ 
        status: 'LINE Bot is running!',
        timestamp: new Date().toISOString()
    });
});

// LINE Webhook 端點（先驗證簽名）
app.post('/webhook', verifyLineSignature, lineController.handleWebhook);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 Webhook URL: /webhook`);
});