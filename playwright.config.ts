require('dotenv').config();
import { defineConfig, devices } from '@playwright/test';
import {Timeout} from './constants/timeout';
import dotenv from 'dotenv';
import path from 'path';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  
  timeout:120000,
  expect: {
    timeout: Timeout.DEFAULT, // 10 seconds
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: Timeout.DEFAULT  , //10 seconds
    navigationTimeout: Timeout.LONG,
    // 30 seconds

  },

  /* Configure projects for major browsers */
  projects: [
    
    { name: 'setup',
      testMatch: /.*\.setup\.ts/
    },
    
    {
      name: 'chromium',
      testDir: './tests',
      //use:{headless: true,}
     // dependencies: ['setup'], // This ensures the 'setup' project runs before 'chromium'
    },
  ],
 
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
// Set a global timeout of 60 seconds for each test
});
