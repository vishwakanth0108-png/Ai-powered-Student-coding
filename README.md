# Loop — coding practice

A small, browser-based coding practice platform for Python 3, Java, C, and C++. It includes a problem library, a coding workspace with sample tests, locally saved solutions and progress, and optional AI hints, error analysis, and progress summaries.

## Run locally

Open `index.html` in a modern browser. No build step or package installation is required. If your browser restricts requests from `file://`, serve the folder with any local static HTTP server instead.

## Configure AI and code execution

Open **Settings** in the app:

- **AI provider API key:** Optional. AI coaching calls OpenAI's Chat Completions API using `gpt-4o-mini`. The key is kept in this browser's local storage and sent directly to OpenAI when an AI action is requested. Code and progress are sent only when you request a hint, analysis, or summary.
- **Code runner endpoint:** Optional. Code execution uses a Judge0-compatible `/submissions` API. The default endpoint is `https://ce.judge0.com`; set another endpoint and optional API key if your runner requires them. Your code and sample input are sent to that runner.

Keys and progress are stored in this browser only. This browser-only setup is suitable for a personal prototype, not a shared deployment: a production service should keep provider credentials on a server and apply authentication, rate limits, and usage controls. External AI and code-runner requests require network access, and the services' availability, CORS policies, and terms apply.

## Included practice problems

The starter library has 15 problems across Easy, Medium, and Hard levels, covering arrays, strings, loops, algorithms, and fundamentals. Filter by topic and difficulty in the practice library. Sample test cases are run by the configured code runner; a problem is marked solved when all its sample tests pass.
