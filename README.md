# LINE Chatbot Project

This project is a LINE chatbot that integrates with Deekseek AI to provide automated customer service. The chatbot listens for messages from users and responds using AI-generated replies.

## Project Structure

```
line-chatbot-project
├── src
│   ├── app.js                  # Entry point of the application, sets up Express middleware and routes.
│   ├── controllers
│   │   └── lineController.js    # Contains functions to handle LINE Webhook events.
│   ├── services
│   │   ├── lineService.js       # Interacts with LINE API, includes methods like sendMessage and getUserProfile.
│   │   └── aiService.js         # Interacts with Deekseek AI API, includes method getResponse.
│   ├── middleware
│   │   └── lineWebhook.js       # Middleware function to verify the signature of requests from LINE.
│   └── utils
│       └── config.js           # Exports configuration constants such as LINE Channel ID and Channel Secret.
├── .env                         # Environment variables for LINE API and Deekseek AI API Key.
├── package.json                 # npm configuration file listing dependencies and scripts.
├── railway.toml                 # Railway configuration file for deployment settings.
└── README.md                    # Documentation and usage instructions for the project.
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd line-chatbot-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   LINE_CHANNEL_ID=1638463423
   LINE_CHANNEL_SECRET=8fe8c826c35819f5573b12f3e9c0b500
   DEEKSEEK_API_KEY=sk-4e8e0a6cdb2e4271a397efdcd04fcb29
   ```

4. **Run the application:**
   ```
   npm start
   ```

## Usage

- The chatbot will respond to messages sent to the LINE Official Account.
- It uses the Deekseek AI API to generate responses based on user input.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.# Trigger redeploy 2025年 8月13日 週三 04時00分15秒 CST
