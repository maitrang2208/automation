// global.d.ts (create if doesn't exist)
declare namespace NodeJS {
  export interface ProcessEnv {
    TEST_USERNAME: string;
    TEST_PASSWORD: string;
    BASE_URL: string;
  }
}