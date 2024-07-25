# Étape de build
FROM node:18 AS build

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de configuration
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste des fichiers du projet
COPY . .

# Exécute le build
RUN npm run build

# Étape de production
FROM nginx:alpine

# Copie les fichiers buildés depuis l'étape de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copie la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port sur lequel Nginx écoute
EXPOSE 3000

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
