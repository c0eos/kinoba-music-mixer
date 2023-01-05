FROM node:19-alpine AS builder

ARG VITE_BACKEND_URL

WORKDIR /app

# install deps
COPY package.json yarn.lock ./
RUN yarn install

# build
COPY . .
RUN yarn run build-only

# server
FROM nginx:alpine

# copy build files and config
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# start
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
