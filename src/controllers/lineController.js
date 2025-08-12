const LineService = require('../services/lineService');
const AIService = require('../services/aiService');

class LineController {
    constructor() {
        this.lineService = new LineService(process.env.CHANNEL_ACCESS_TOKEN);
        this.aiService = new AIService();
    }

    async handleWebhook(req, res) {
        try {
            const events = req.body.events || [];

            for (const event of events) {
                if (event.type === 'message' && event.message.type === 'text') {
                    const replyToken = event.replyToken;
                    const userMessage = event.message.text;

                    // 取得 AI 回應
                    const aiResponse = await this.aiService.getResponse(userMessage);
                    
                    // 發送回覆訊息
                    await this.lineService.sendMessage(replyToken, aiResponse);
                }
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Webhook處理錯誤:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new LineController();