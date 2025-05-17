#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import * as dotenv from 'dotenv';
import { createOpenRouterClient, chatWithPerplexity, PERPLEXITY_MODELS } from './openrouter';

// Load environment variables
dotenv.config();

// Get API key from environment or command line
const getApiKey = (cmdApiKey?: string) => {
  const apiKey = cmdApiKey || process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error(chalk.red('Error: OpenRouter API key is required.'));
    console.log('Set the OPENROUTER_API_KEY environment variable or pass it with --api-key');
    process.exit(1);
  }
  return apiKey;
};

const formatModelName = (model: string) => {
  switch (model) {
    case 'sonar-large':
      return PERPLEXITY_MODELS.SONAR_LARGE;
    case 'sonar-small':
      return PERPLEXITY_MODELS.SONAR_SMALL;
    default:
      return model;
  }
};

program
  .name('openrouter-cli')
  .description('CLI interface for testing OpenRouter with Perplexity Sonar models')
  .version('1.0.0');

program
  .command('chat')
  .description('Chat with Perplexity model through OpenRouter')
  .argument('<prompt>', 'The prompt to send to the model')
  .option('-a, --api-key <key>', 'OpenRouter API key')
  .option('-m, --model <model>', 'Model to use (sonar-large, sonar-small)', 'sonar-large')
  .option('-t, --temperature <number>', 'Temperature (0-2)', '0.7')
  .option('-max, --max-tokens <number>', 'Maximum number of tokens to generate', '1000')
  .action(async (prompt, options) => {
    try {
      const apiKey = getApiKey(options.apiKey);
      const client = createOpenRouterClient(apiKey);
      const model = formatModelName(options.model);
      
      console.log(chalk.cyan(`\n🤖 Using model: ${model}`));
      console.log(chalk.blue(`💬 Prompt: ${prompt}\n`));
      
      const spinner = ora('Thinking...').start();
      
      const response = await chatWithPerplexity(
        client,
        prompt,
        model,
        parseFloat(options.temperature),
        parseInt(options.maxTokens)
      );
      
      spinner.succeed('Response received:');
      console.log(chalk.green('\n' + response + '\n'));
    } catch (error: any) {
      console.error(chalk.red(`\n❌ Error: ${error.message || error}\n`));
      process.exit(1);
    }
  });

program
  .command('models')
  .description('List available Perplexity models')
  .action(() => {
    console.log(chalk.cyan('\nAvailable Perplexity models through OpenRouter:\n'));
    
    Object.entries(PERPLEXITY_MODELS).forEach(([key, value]) => {
      console.log(`${chalk.green(key.toLowerCase())}: ${chalk.blue(value)}`);
    });
    
    console.log('\nUsage example:');
    console.log(chalk.gray('  npx openrouter-cli chat "What are the benefits of quantum computing?" --model sonar-large\n'));
  });

program.parse();

// If no arguments provided, show help
if (process.argv.length === 2) {
  program.help();
} 