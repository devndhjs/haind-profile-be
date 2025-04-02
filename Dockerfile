# Sử dụng image Node.js chính thức
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch ứng dụng NestJS
RUN npm run build

# Mở cổng 3000 để phục vụ ứng dụng
EXPOSE ${PORT}

# Lệnh chạy ứng dụng khi container khởi động
CMD ["npm", "run", "start:prod"]
