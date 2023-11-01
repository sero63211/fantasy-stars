# Verwende ein offizielles Node.js-Image als Basis
FROM node:latest

# Arbeitsverzeichnis im Container definieren
WORKDIR /usr/src/app

# Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm install

# Wenn du serve für das Hosting verwendest:
# RUN npm install -g serve

# Quellcode und alle anderen notwendigen Dateien in den Container kopieren
COPY . .

# Port, auf dem der Webserver laufen wird, öffnen
EXPOSE 30001

# Befehl, um die App im Container zu starten
CMD [ "npm", "start" ]
# Wenn du serve verwendest, könnte es so aussehen:
# CMD [ "serve", "-s", "build", "-l", "3001" ]

