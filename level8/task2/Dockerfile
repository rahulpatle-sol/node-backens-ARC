# Stage 1 — Build
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .

# Stage 2 — Production — sirf jo chahiye
FROM oven/bun:1-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["bun", "run", "index.ts"]