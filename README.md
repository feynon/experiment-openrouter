# OpenRouter Perplexity CLI

A command-line interface for testing the Perplexity Sonar models via OpenRouter.

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd openrouter-perplexity-cli

# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

You can configure the API key in two ways:

1. Pass it directly as a command-line argument: `--api-key <your-api-key>`
2. Set it as an environment variable:
   - Create a `.env` file in the root directory with:
     ```
     OPENROUTER_API_KEY=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
     SITE_URL=https://your-site-url.com
     SITE_NAME=OpenRouter CLI Test
     ```

## Usage

### View available models

```bash
npm start -- models
```

### Chat with Perplexity

```bash
# Basic usage with default model (sonar-large)
npm start -- chat "What is quantum computing?"

# Using a specific model
npm start -- chat "Tell me about the future of AI" --model sonar-large

# With temperature setting (0-2, default: 0.7)
npm start -- chat "Write a short story about robots" --model sonar-small --temperature 1.2

# Set maximum tokens (default: 1000)
npm start -- chat "Explain blockchain technology" --max-tokens 500
```

### Command-line options

- `-a, --api-key <key>`: OpenRouter API key
- `-m, --model <model>`: Model to use (sonar-large, sonar-small)
- `-t, --temperature <number>`: Temperature (0-2)
- `-max, --max-tokens <number>`: Maximum number of tokens to generate

## Development

```bash
# Run in development mode
npm run dev -- chat "What is the capital of France?"
```

## Available Perplexity Models

- `sonar-large`: perplexity/llama-3.1-sonar-large-128k-online
- `sonar-small`: perplexity/llama-3.1-sonar-small-128k-online