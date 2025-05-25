import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Read CLI flags
const cliEnv = process.argv.find(arg => arg.startsWith('--env='))?.split('=')[1];
const cliUsername = process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1];
const cliPassword = process.argv.find(arg => arg.startsWith('--password='))?.split('=')[1];

// Assign CLI flags to process.env if present, otherwise keep .env values
process.env.BASE_URL = cliEnv || process.env.BASE_URL;
process.env.MY_USERNAME = cliUsername || process.env.MY_USERNAME;
process.env.MY_PASSWORD = cliPassword || process.env.MY_PASSWORD;

export default defineConfig({
  testDir: './tests',
  use: {
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }
  },
  reporter: [
    ['list'],
    ['allure-playwright']
  ]
});




/*
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Parse CLI arguments
const cliEnv = process.argv.find(arg => arg.startsWith('--env='))?.split('=')[1];
const cliUsername = process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1];
const cliPassword = process.argv.find(arg => arg.startsWith('--password='))?.split('=')[1];

// Override with CLI values if provided
if (cliEnv) process.env.BASE_URL = cliEnv;
if (cliUsername) process.env.USERNAME = cliUsername;
if (cliPassword) process.env.PASSWORD = cliPassword;

export default defineConfig({
  testDir: './tests',
  use: {
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }
  }
}); */