FROM node:20

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install -g @angular/cli && npm install

COPY frontend .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
