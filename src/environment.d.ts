export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      HOST: string;
      PORT: string;
      CACHE_PORT: string;
      CACHE_HOST: string;
      CACHE_PASSWORD: string | undefined;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      DB_HOST: string;
    }
  }
}
