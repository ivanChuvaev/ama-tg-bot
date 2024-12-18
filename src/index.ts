import "dotenv/config";
import { Bot } from "grammy";
import express from "express";
import cors from "cors";

const app = express();
const bot = new Bot(process.env.BOT_TOKEN!);

// bot.on("callback_query", (ctx) => {
//   const data = ctx.update.callback_query.data;
//   ctx.editMessageReplyMarkup();
//   ctx.reply(`Вы нажали на ${data}`);
// });

app.use(cors());
app.use(express.json());

app.post(`/${process.env.WEBAPP!}`, (req, res) => {
  const { user, text, replyMarkup } = req.body as {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
    };
    text: string;
    replyMarkup: any;
  };
  bot.api.sendMessage(user.id, text, {
    reply_markup: replyMarkup,
  });
  res.sendStatus(200);
});

bot.start();
app.listen(Number(process.env.PORT!), () => {
  console.log(`Server started on port ${Number(process.env.PORT!)}`);
});
