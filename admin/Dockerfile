FROM node:20-alpine AS build
WORKDIR /app

# Instalar deps
COPY package*.json ./
RUN npm install

# Copiar código e build
COPY . .
ARG NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_API_BASE=${NEXT_PUBLIC_API_BASE}
RUN npm run build

# Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./
ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm","start"]
