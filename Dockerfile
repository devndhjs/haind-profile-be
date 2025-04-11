FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY node_modules ./node_modules
COPY dist ./dist

ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist/main"]




# version for better server
# Stage 1: Build ứng dụng NestJS
# FROM node:20-alpine AS builder

# WORKDIR /app

# # Cài đặt deps cho build
# COPY package*.json ./
# RUN npm ci

# # Copy toàn bộ source để build
# COPY . .

# # Biên dịch mã nguồn TypeScript sang JavaScript
# RUN npm run build


# # Stage 2: Image production nhẹ hơn
# FROM node:20-alpine AS runner

# WORKDIR /app

# # Chỉ copy các file cần thiết từ stage build
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist

# # Biến môi trường và cổng mặc định
# EXPOSE ${PORT}

# # Chạy ứng dụng production
# CMD ["node", "dist/main"]
