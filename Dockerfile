# 使用 node:18-alpine 构建阶段，并命名为 build-stage
FROM node:18-alpine AS build-stage

# 设置维护者标签
LABEL maintainer="Leo 'song.lhlh@gmail.com'"

# 设置工作目录
WORKDIR /app

# 仅复制 package.json 和 pnpm-lock.yaml 用于依赖安装
COPY package.json pnpm-lock.yaml ./

# 设置 npm 镜像源并安装 pnpm，同时安装项目依赖并构建
RUN echo "https://registry.npmmirror.com" > .npmrc && \
    npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm build && \
    rm .npmrc

# 复制项目的源文件（为了缩小镜像体积，将此步骤放在依赖安装后）
COPY . .

# 使用 nginx 的稳定 alpine 版本
FROM nginx:stable-alpine

# 将编译后的文件复制到 nginx 的默认静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html/dist

# 将自定义 nginx 配置文件复制到 nginx 配置目录
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf

# 暴露端口 80
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
