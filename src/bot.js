import TelegramBot from "node-telegram-bot-api";
import {
  handleStartCommand,
  handleCallbackQuery,
  handleClearCommand,
  handleMessage,
} from "./handlers.js";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  handleStartCommand(bot, msg.chat.id);
});

bot.on("callback_query", (callbackQuery) => {
  handleCallbackQuery(bot, callbackQuery.message.chat.id, callbackQuery.data);
});

bot.onText(/\/clear/, (msg) => {
  handleClearCommand(bot, msg.chat.id);
});

bot.on("message", (msg) => {
  handleMessage(bot, msg);
});
