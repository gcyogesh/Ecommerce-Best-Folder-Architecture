// env.d.ts
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
      }
    }
  }
  
  // This is necessary to make the file a module and avoid the TypeScript error
  export {};
  