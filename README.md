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
     OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

# Get responses with citations
npm start -- chat "What are the latest advancements in quantum computing?" --citations
```

### Command-line options

- `-a, --api-key <key>`: OpenRouter API key
- `-m, --model <model>`: Model to use (sonar-large, sonar-small)
- `-t, --temperature <number>`: Temperature (0-2)
- `-max, --max-tokens <number>`: Maximum number of tokens to generate
- `-c, --citations`: Include citations in the response

## Getting Citations from Perplexity

Perplexity Sonar models can provide citations for factual information. To enable citations:

```bash
# Ask a factual question with citations enabled
npm start -- chat "What are the recent developments in nuclear fusion?" --citations
```

Example response with citations:

```
Recent developments in nuclear fusion include:

1. Commonwealth Fusion Systems (CFS) successfully tested high-temperature superconducting magnets in September 2021, achieving a field strength of 20 tesla[1].

2. The National Ignition Facility (NIF) at Lawrence Livermore National Laboratory achieved fusion ignition in December 2022, producing more energy from fusion than was used to drive it[2][3].

3. The Joint European Torus (JET) set a new record for sustained fusion energy in February 2022, producing 59 megajoules of energy over five seconds[4].

4. ITER construction continues in France, with first plasma operations now scheduled for 2025-2026 and full deuterium-tritium fusion expected in the 2030s[5].

5. Several private fusion companies have received significant funding, with over $4.7 billion invested in private fusion ventures since 2021[6].

[1] https://www.nature.com/articles/d41586-021-02338-4
[2] https://www.energy.gov/science/articles/doe-national-laboratory-makes-history-achieving-fusion-ignition
[3] https://www.llnl.gov/news/national-ignition-facility-achieves-fusion-ignition
[4] https://www.euro-fusion.org/news/2022/february/jet-breaks-fusion-energy-record/
[5] https://www.iter.org/proj/itermilestones
[6] https://fusionindustryassociation.org/about-fusion-industry/
```

## Development

```bash
# Run in development mode
npm run dev -- chat "What is the capital of France?"
```

## Available Perplexity Models

- `sonar-large`: perplexity/llama-3.1-sonar-large-128k-online
- `sonar-small`: perplexity/llama-3.1-sonar-small-128k-online