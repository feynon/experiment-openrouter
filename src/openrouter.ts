import OpenAI from 'openai';

// Initialize the OpenAI client with OpenRouter base URL
export const createOpenRouterClient = (apiKey: string) => {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    defaultHeaders: {
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'OpenRouter CLI Test',
    }
  });
};

// Function to chat with Perplexity Sonar model
export const chatWithPerplexity = async (
  client: OpenAI,
  prompt: string,
  modelName: string = 'perplexity/llama-3.1-sonar-large-128k-online',
  temperature: number = 0.7,
  maxTokens: number = 1000,
  showCitations: boolean = false
) => {
  try {
    console.log('Sending request to OpenRouter with model:', modelName);
    
    // Log request details for debugging
    console.log('Request details:');
    const maskedApiKey = client.apiKey ? `${client.apiKey.substring(0, 5)}...${client.apiKey.substring(client.apiKey.length - 5)}` : 'No API key';
    console.log('- API Key format:', maskedApiKey);
    console.log('- Base URL:', client.baseURL);
    console.log('- Show citations:', showCitations);
    
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
      show_citations: showCitations // Enable citations when requested
    } as any); // Using type assertion to allow for OpenRouter specific parameters

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