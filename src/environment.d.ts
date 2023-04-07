export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            HOST: string;
            PORT: number;
            REDIS_PORT: string;
            REDIS_HOST: string;
            REDIS_PASSWORD: string|undefined;
            REDIS_PORT: string;
            POSTGRES_USER: string;
            POSTGRES_PASSWORD: string;
            POSTGRES_DB: string;
            POSTGRES_HOST: string;
        }
    }
}