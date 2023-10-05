FROM node:20-alpine
WORKDIR /app
COPY /src /app
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
