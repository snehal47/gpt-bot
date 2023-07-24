import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const model = new OpenAI({
  openAIApiKey: "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",
});
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory: memory });

export default async function handler(req, res) {
  const message = req.body.message;
  try {
    const response = await chain.call({ input: message });
    res.json(response.response);
  } catch (error) {
    res.status(500).json({ error });
  }
}
