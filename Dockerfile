FROM oven/bun:1.1-alpine AS builder
WORKDIR /usr/src/app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
RUN rm -rf node_modules && bun install --production --frozen-lockfile


FROM oven/bun:1.1-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 8081

CMD ["bun", "dist/main.js"]