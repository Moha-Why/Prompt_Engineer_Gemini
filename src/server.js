import express, { response } from "express"
import confing from "dotenv"
import dotenv from "dotenv"
import cors from "cors"
import { GoogleGenAI } from "@google/genai"
import { InferenceClient } from "@huggingface/inference";

dotenv.config()



const app = express()

const client = new InferenceClient(process.env.HF_TOKEN);
app.use(cors());
app.use(express.json())


app.post("/", async (req, res) => {
    try {
        const { prompt } = req.body
        // console.log(prompt)
        if (!prompt) {
            return res.status(400).json({error: "prompt is required"})
        }
        const chatCompletion = await client.chatCompletion({
            model: "deepseek-ai/DeepSeek-R1:novita",
            messages: [
                {
                    role: "system",
                    content: `
                    You are an expert AI prompt engineer and web developer.
                    I will give you a brief idea or concept for a website.

                    Your task is to:
                    1. Refactor this idea into a fully detailed prompt that can be given to another AI to generate a working website or full-stack project.
                    2. Include:
                    - Purpose and goal of the website
                    - Target audience
                    - Frontend features and layout
                    - Tech stack suggestions
                    - UI/UX guidelines
                    - Constraints

                    Rules:
                    - Return normal text only (no markdown)
                    - Structure the output into clear sections
                    - Do not exceed 40 lines
                    - Do not write any code
                    - Do not return your thinking process or use any markup
                    - Do not create mock data; instruct the other AI to do it
                    - Do not over-engineer the prompt`
                },
                {
                role: "user",
                content: prompt // e.g. "A website for a local gym"
                }
            ],
            });
            console.log(chatCompletion)

        return res.status(200).json({data: chatCompletion.choices[0].message})
        } catch(err) {
            return res.status(200).json({error: err})
        }
        
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})