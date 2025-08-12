const LineService = require('../services/lineService');
const AIService = require('../services/aiService');

const lineService = new LineService(process.env.CHANNEL_ACCESS_TOKEN);
const aiService = new AIService();

async function handleWebhook(req, res) {
    try {
        console.log('🔄 Webhook 收到請求:', JSON.stringify(req.body, null, 2));
        const events = req.body.events || [];
        console.log('📥 事件數量:', events.length);

        for (const event of events) {
            console.log('📋 處理事件:', event.type, event.message?.type);
            
            if (event.type === 'message' && event.message.type === 'text') {
                const replyToken = event.replyToken;
                const userMessage = event.message.text;

                console.log('💬 收到用戶訊息:', userMessage);
                console.log('🎫 回覆令牌:', replyToken);

                // 取得 AI 回應
                console.log('🤖 正在呼叫 AI 服務...');
                const aiResponse = await aiService.getResponse(userMessage);
                console.log('✅ AI 回應:', aiResponse);
                
                // 發送回覆訊息
                console.log('📤 正在發送回覆...');
                
                // 測試模式：如果是測試 token，就跳過實際發送
                if (replyToken === 'test123') {
                    console.log('🧪 測試模式 - 跳過實際發送 LINE 訊息');
                    console.log('✅ 模擬訊息發送成功');
                } else {
                    await lineService.sendMessage(replyToken, aiResponse);
                    console.log('✅ 訊息發送成功');
                }
            }
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('❌ Webhook處理錯誤:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { handleWebhook };