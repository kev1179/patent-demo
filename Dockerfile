# Fetching the latest node image on apline linux
FROM node:22 AS builder

# Declaring env
# ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package*.json ./
RUN npm install

# Copying all the files in our project
COPY .env ./
COPY . .
# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]