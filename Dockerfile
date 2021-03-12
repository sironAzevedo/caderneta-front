FROM node:latest as angular
WORKDIR /app
COPY package.json /app
COPY environment.js /app
RUN npm install --silent
COPY . .

ENV ENVIRONMENT=docker
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/caderneta-front /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t caderneta-front .
# docker run -p 8081:80 caderneta-front 