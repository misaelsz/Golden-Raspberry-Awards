# Use a imagem oficial do Node.js como base
FROM node:20-alpine as build-stage

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install -g @angular/cli@latest
RUN npm install

# Copia todo o código da aplicação para o diretório de trabalho no contêiner
COPY . .

# Constrói a aplicação Angular
RUN ng build --configuration production

# Usa uma imagem oficial do Nginx para servir a aplicação
FROM nginx:alpine

# Copia os arquivos construídos da etapa anterior para o diretório padrão do Nginx
COPY --from=build-stage /app/dist/golden-raspberry-awards/browser /usr/share/nginx/html

# Copia a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta em que o Nginx está rodando
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
