const axios = require('axios');

class LineService {
    constructor(channelAccessToken) {
        this.channelAccessToken = channelAccessToken;
        this.baseUrl = 'https://api.line.me/v2/bot';
    }

    async sendMessage(replyToken, message) {
        const url = `${this.baseUrl}/message/reply`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.channelAccessToken}`
        };
        const data = {
            replyToken: replyToken,
            messages: [{
                type: 'text',
                text: message
            }]
        };

        try {
            const response = await axios.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error.response?.data || error.message);
            throw error;
        }
    }

    async getUserProfile(userId) {
        const url = `${this.baseUrl}/profile/${userId}`;
        const headers = {
            'Authorization': `Bearer ${this.channelAccessToken}`
        };

        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error.response?.data || error.message);
            throw error;
        }
    }
}

module.exports = LineService;