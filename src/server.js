import express, { response } from "express"
import confing from "dotenv"
import dotenv from "dotenv"
import cors from "cors"
import { GoogleGenAI } from "@google/genai"

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())


app.post("/", async (req, res) => {
    try {
        const { prompt } = req.body
        console.log(prompt)
        if (!prompt) {
            res.status(400).json({error: "prompt is required"})
        }
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert AI prompt engineer and web developer. I will give you a brief idea or concept for a website. Your task is to:
                    1. Refactor this idea into a **fully detailed prompt** that can be given to another AI (like Claude, Cursor, or ChatGPT) to generate a working website or full-stack project.
                    2. Include all necessary details such as:
                    - Purpose and goal of the website
                    - Target audience
                    - Frontend features and layout (pages, components, navigation)
                    - Tech stack suggestions (React, Node.js, Express, PostgreSQL, etc.)
                    - UI/UX guidelines (colors, fonts, responsiveness)
                    - return it as normal text, no markup, 
                    - constraints
                    - dont exceed 40 lines
                    3. Structure the output in **clear sections** so it can be directly used as an input for other AI tools.
                    Most importantly dont over engineer the prompt, make it in normal size, and dont create the mock data, tell the other ai to do it
                    Do **not** write any code yourself. Only create the complete prompt for another AI.
                    Website idea: ${prompt}`,
        });
        // console.log(response.text);
        res.status(200).json({data: response.text})
        } catch(err) {
            res.status(200).json({error: err})
        }
        
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})