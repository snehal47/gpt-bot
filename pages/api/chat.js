import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-kGP536pL9ma5xjFvG5wwicJC",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

let chatLog = [];

export default async function handler(req, res) {
  const message = req.body.message;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...chatLog, { role: "user", content: message }],
    });

    chatLog.push({ role: "user", content: message });
    chatLog.push(response.data.choices[0].message);
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error });
  }
}
