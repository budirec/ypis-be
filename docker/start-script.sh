#!/bin/sh
if [ ! -d "./node_modules" ]; then
    npm i
fi

if [ ${NODE_ENV} == "production" ]; then
    npm run up
fi

npm run dev