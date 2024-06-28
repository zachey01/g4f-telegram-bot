import {
  getDialogueHistory,
  updateDialogueHistory,
  clearDialogueHistory,
} from "./db.js";
import { translations } from "./translations.js";
import { G4F } from "g4f";

const g4f = new G4F();

export const handleStartCommand = (bot, userId) => {
  const languageKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Русский", callback_data: "lang_ru" },
          { text: "English", callback_data: "lang_en" },
        ],
        [
          { text: "Українська", callback_data: "lang_uk" },
          { text: "Français", callback_data: "lang_fr" },
        ],
        [{ text: "中文", callback_data: "lang_zh" }],
      ],
    },
  };
  bot.sendMessage(userId, translations.ru.choose_language, languageKeyboard);
};

export const handleCallbackQuery = async (bot, userId, data) => {
  if (data.startsWith("lang_")) {
    const language = data.split("_")[1];
    await updateDialogueHistory(userId, [], language, "gpt-4");
    const mainMenuKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: translations[language].clear_button }],
          [{ text: translations[language].choose_model }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    };
    bot.sendMessage(userId, translations[language].start, mainMenuKeyboard);
  } else if (data.startsWith("model_")) {
    const model = data.split("_")[1];
    const { language } = await getDialogueHistory(userId);
    await updateDialogueHistory(userId, [], language, model);
    bot.sendMessage(userId, translations[language].choosed_model + model, {
      reply_markup: {
        keyboard: [
          [{ text: translations[language].clear_button }],
          [{ text: translations[language].choose_model }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    });
  }
};

export const handleClearCommand = async (bot, userId) => {
  await clearDialogueHistory(userId);
  const { language } = await getDialogueHistory(userId);
  bot.sendMessage(userId, translations[language].clear);
};

export const handleMessage = async (bot, msg) => {
  const userId = msg.chat.id;
  const { messages, language, model } = await getDialogueHistory(userId);

  if (msg.text === translations[language].clear_button) {
    await clearDialogueHistory(userId);
    bot.sendMessage(userId, translations[language].clear);
  } else if (msg.text === translations[language].choose_model) {
    const modelKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "GPT-4", callback_data: "model_gpt-4" },
            { text: "GPT-3.5-turbo", callback_data: "model_gpt-3.5-turbo" },
          ],
        ],
      },
    };
    bot.sendMessage(userId, translations[language].choose_model, modelKeyboard);
  } else {
    if (msg.text.startsWith("/")) return;

    const userMessage = { role: "user", content: msg.text };
    const updatedMessages = [...messages, userMessage];

    const options = {
      provider: g4f.providers.GPT,
      model: model,
      debug: true,
      proxy: "",
    };

    try {
      await bot.sendChatAction(userId, "typing");
      const response = await g4f.chatCompletion(updatedMessages, options);
      const botMessage = { role: "assistant", content: response };
      const newMessages = [...updatedMessages, botMessage];
      await updateDialogueHistory(userId, newMessages, language, model);
      bot.sendMessage(userId, response);
    } catch (error) {
      console.error(error);
    }
  }
};
