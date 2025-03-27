FROM node:22
ENV NODE_ENV production
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
EXPOSE 5000