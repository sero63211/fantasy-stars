# Verwende ein offizielles Node.js-Image als Basis
FROM node:latest

# Arbeitsverzeichnis im Container definieren
WORKDIR /usr/src/app

# Abhängigkeiten kopieren und installieren.
# Achte darauf, dass 'package-lock.json' auch vorhanden ist, falls es existiert, für eine exakte Installation der Abhängigkeiten.
COPY package*.json ./
RUN npm install
# Optional: Globale Pakete wie serve könnten hier installiert werden, falls benötigt.
# RUN npm install -g serve

# Quellcode und alle anderen notwendigen Dateien in den Container kopieren
# Stelle sicher, dass .dockerignore Dateien definiert, die nicht kopiert werden sollen (z.B. node_modules, .git, etc.)
COPY . .

# Port, auf dem der Webserver laufen wird, öffnen
# Dies sagt Docker, auf welchem Port die Anwendung lauscht; dieser Port wird bei der Ausführung des Containers verfügbar gemacht.
EXPOSE 3000

# Befehl, um die App im Container zu starten
CMD [ "npm", "start" ]
# Alternative, wenn 'serve' zum Hosting nach dem Erstellen der Anwendung verwendet wird:
# CMD [ "serve", "-s", "build", "-l", "3000" ]
