import OpenAI from 'openai';

// Initialize the OpenAI client with OpenRouter base URL
export const createOpenRouterClient = (apiKey: string) => {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    defaultHeaders: {
      'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
      'X-Title': process.env.SITE_NAME || 'OpenRouter CLI Test',
    },
  });
};

// Function to chat with Perplexity Sonar model
export const chatWithPerplexity = async (
  client: OpenAI,
  prompt: string,
  modelName: string = 'perplexity/llama-3.1-sonar-large-128k-online',
  temperature: number = 0.7,
  maxTokens: number = 1000
) => {
  try {
    const completion = await client.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: temperature,
      max_tokens: maxTokens,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error querying Perplexity model:', error);
    throw error;
  }
};

// Available Perplexity models
export const PERPLEXITY_MODELS = {
  SONAR_LARGE: 'perplexity/llama-3.1-sonar-large-128k-online',
  SONAR_SMALL: 'perplexity/llama-3.1-sonar-small-128k-online'
}; 