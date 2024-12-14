# Usa una imagen base de Node.js
FROM node:lts

# Establece el directorio de trabajo en /app
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Expone el puerto 3001
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]