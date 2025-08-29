#!/bin/sh
set -e

# Instala git e bash se não estiverem
apk add --no-cache git bash

cd /app

# Se não for repositório, clona
if [ ! -d ".git" ]; then
    echo "Clonando repositório..."
    rm -rf /app/*
    git clone --depth 1 https://github.com/pedrostyxx/discord_op.git .
else
    echo "Atualizando repositório..."
    git pull
fi

# Instala dependências
npm install

# Roda o bot
node index.js
