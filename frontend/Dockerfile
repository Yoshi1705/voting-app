# Stage 1: The Build (Optional, but cleaner)
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: The Web Server (The "Jar Runner")
FROM nginx:stable-alpine
# Copy the 'dist' folder from the build stage to Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]