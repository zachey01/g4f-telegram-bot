# Telegram Bot for Free Access to ChatGPT-4 and ChatGPT-3

This Telegram bot provides free access to ChatGPT-4 and ChatGPT-3. Users can select their preferred language, clear chat history, and all user data is stored in `dialogues.db`.

## Features

- Access to ChatGPT-4 and ChatGPT-3
- Language selection
- Clear chat history
- User data storage in `dialogues.db`

## Prerequisites

- Node or Bun

## Installation and Setup

### Using npm

1. **Clone the repository:**

   ```sh
   git clone https://github.com/zachey01/g4f-telegram-bot.git
   cd g4f-telegram-bot
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your Telegram bot token:

   ```env
   TELEGRAM_TOKEN=your-telegram-bot-token
   ```

4. **Run the bot:**
   ```sh
   node src/bot.js
   ```

### Using bun.sh

1. **Clone the repository:**

   ```sh
   git clone https://github.com/zachey01/g4f-telegram-bot.git
   cd g4f-telegram-bot
   ```

2. **Install dependencies:**

   ```sh
   bun install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your Telegram bot token:

   ```env
   TELEGRAM_TOKEN=your-telegram-bot-token
   ```

4. **Run the bot:**
   ```sh
   bun run src/bot.js
   ```

## Database

All user data, including chat history, is stored in `dialogues.db`.

## Contributing

Feel free to open issues or submit pull requests if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License.
