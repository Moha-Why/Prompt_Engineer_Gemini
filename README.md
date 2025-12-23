AI Prompt Improver API

A simple Node.js + Express backend that takes a rough website idea from the user and returns a specialized, structured prompt using the Gemini API. Perfect for building a web app that transforms vague ideas into actionable website briefs.

Features

Accepts a website idea from the frontend

Sends the idea to the Gemini API

Returns a structured, improved prompt

Easy to integrate with any frontend

Tech Stack

Node.js

Express.js

TypeScript (optional)

Gemini API

Getting Started
Prerequisites

Node.js >= 18

npm or yarn

Gemini API key

Installation

Clone the repo:

git clone https://github.com/your-username/ai-prompt-improver.git
cd ai-prompt-improver


Install dependencies:

npm install

Create a .env file in the root:

GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000

Running the server
npm run dev
