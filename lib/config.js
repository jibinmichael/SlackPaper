const { z } = require('zod');
require('dotenv').config();

// Environment variable schema
const envSchema = z.object({
  // Slack App Credentials
  SLACK_CLIENT_ID: z.string().min(1),
  SLACK_CLIENT_SECRET: z.string().min(1),
  SLACK_SIGNING_SECRET: z.string().min(1),
  
  // MongoDB
  MONGODB_URI: z.string().url().startsWith('mongodb'),
  
  // Encryption
  ENCRYPTION_KEY: z.string().length(64).regex(/^[0-9a-fA-F]{64}$/),
  
  // OpenAI
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  
  // Upstash Redis
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  
  // App URL
  APP_URL: z.string().url(),
  
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

// Validate and export config
let config;
try {
  config = envSchema.parse(process.env);
} catch (error) {
  console.error('Environment validation failed:');
  console.error(error.errors);
  // Only throw in production, allow dev to continue with warnings
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment configuration');
  }
}

// Slack OAuth scopes required
const SLACK_SCOPES = {
  BOT: [
    'channels:history',
    'channels:read',
    'chat:write',
    'users:read',
    'files:read',
    'team:read',
    'groups:history',
    'groups:read',
    'im:history',
    'mpim:history'
  ],
  USER: []
};

module.exports = {
  config,
  SLACK_SCOPES
}; 