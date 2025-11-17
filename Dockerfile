FROM node:20-slim AS base
ENV NODE_ENV=production
WORKDIR /app

FROM base AS deps
RUN npm i -g npm@11.6.2
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

FROM base AS assets
RUN npm i -g npm@11.6.2
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY tailwind.config.cjs postcss.config.cjs webpack.config.js ./
COPY src ./src
COPY views ./views
COPY public ./public
RUN npm run build:assets

FROM base AS production
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
COPY --from=assets /app/public/assets /app/public/assets
CMD ["node","server.js"]

FROM node:20-slim AS development
ENV NODE_ENV=development
WORKDIR /app
RUN npm i -g npm@11.6.2
COPY package*.json ./
RUN npm install --no-audit --no-fund --ignore-scripts
COPY . .
CMD ["npm","run","dev"]