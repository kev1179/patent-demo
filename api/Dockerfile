FROM node:22
# ENV NODE_ENV production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["node", "index.js"]
EXPOSE 5000