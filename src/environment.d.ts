export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            REDIS_PORT: string;
            REDIS_HOST: string;
            REDIS_PASSWORD: string|undefined;
            REDIS_PORT: string;
        }
    }
}