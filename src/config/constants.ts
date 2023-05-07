export const constants = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '0.0.0.0',
  PORT: parseInt(process.env.PORT) || 80,
  CACHE_HOST: process.env.CACHE_HOST || 'yp-redis',
  CACHE_PORT: process.env.CACHE_PORT || 6379,
  CACHE_PASSWORD: process.env.CACHE_PASSWORD || '',
  DB_USER: process.env.DB_USER || 'myuser',
  DB_PASSWORD: process.env.DB_PASSWORD || 'secret@Pass',
  DB_NAME: process.env.DB_NAME || 'yp',
  DB_HOST: process.env.DB_HOST || 'yp-postgres',
  DB_PORT: parseInt(process.env.DB_PORT || '5432')
};