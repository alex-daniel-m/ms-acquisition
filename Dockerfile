FROM oven/bun:1.3.10 AS install
WORKDIR /usr/src/app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


FROM oven/bun:1.3.10 AS build
WORKDIR /usr/src/app
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
RUN bun run build


FROM oven/bun:1.3.10-slim AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package.json bun.lock ./
COPY tsconfig.json ./
RUN bun install --frozen-lockfile --production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 8081


CMD [ "bun", "run", "dist/main.js" ]