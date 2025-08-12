require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { verifyLineSignature } = require('./middleware/lineMiddleware');
const { handleWebhook } = require('./controllers/lineController');

const app = express();
const PORT = process.env.PORT || 3000;

// 健康檢查端點
app.get('/', (req, res) => {
    res.json({ 
        status: 'LINE Bot is running!',
        timestamp: new Date().toISOString()
    });
});

// 環境變數檢查端點（僅顯示是否存在，不顯示實際值）
app.get('/env-check', (req, res) => {
    res.json({
        CHANNEL_ACCESS_TOKEN: !!process.env.CHANNEL_ACCESS_TOKEN,
        CHANNEL_SECRET: !!process.env.CHANNEL_SECRET,
        DEEPSEEK_API_KEY: !!process.env.DEEPSEEK_API_KEY,
        DEEPSEEK_API_BASE: process.env.DEEPSEEK_API_BASE || 'not set'
    });
});

// LINE Webhook 端點（使用 raw body 來驗證簽名）
app.post('/webhook', 
    bodyParser.raw({type: 'application/json'}),
    (req, res, next) => {
        // 將 raw body 轉換為字串供簽名驗證使用
        req.rawBody = req.body.toString('utf8');
        // 解析 JSON
        try {
            req.body = JSON.parse(req.rawBody);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid JSON' });
        }
        next();
    },
    verifyLineSignature, 
    handleWebhook
);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 Webhook URL: /webhook`);
});