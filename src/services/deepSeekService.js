const axios = require('axios');

class DeepSeekService {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl || 'https://api.deepseek.com/v1';
    }

    async getResponse(userMessage, systemPrompt = '你是一個友善的客服助理，請用繁體中文回答用戶問題。') {
        const url = `${this.baseUrl}/chat/completions`;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };

        const data = {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userMessage
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        };

        try {
            const response = await axios.post(url, data, { headers });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('DeepSeek API Error:', error.response?.data || error.message);
            return '抱歉，我現在無法回答您的問題，請稍後再試。';
        }
    }
}

module.exports = DeepSeekService;
