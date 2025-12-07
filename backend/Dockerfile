FROM node:20

# Diretório onde a aplicação será copiada
WORKDIR /app

# Copia apenas arquivos essenciais primeiro (melhora o cache)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o restante da aplicação
COPY . .

# Porta exposta pelo backend
EXPOSE 3333

# Comando de inicialização
CMD ["npm", "run", "dev"]
