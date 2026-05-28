import { OpenAI } from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import "dotenv/config"

const EntitiesSchema = z.object({
attributes: z.array(z.string()),
colors: z.array(z.string()),
animals: z.array(z.string()),
});

const openai = new OpenAI();
const stream = await openai.responses.create({
    model: "gpt-4.1",
    input: [
        { role: "user", content: "What's the weather like in Paris today?" },
    ],
    text: {
        format: zodTextFormat(EntitiesSchema, "entities"),
    },
    stream: true,
});

for await (const event of stream) {
    console.log(event.type);
}