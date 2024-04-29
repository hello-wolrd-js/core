## @hello-world-js/core

核心monorepo库, 使用 bun 作为包管理和后端运行时.

packages:

1. server(后端): bun,elysia,mongoose
2. web(管理端和客户端): solidjs,tailwind,daisyui

## 部署

核心库支持两种部署方式

### 1.使用官方docker镜像(推荐)

待补充....

### 2.通过源码构建

先把核心库克隆下来:
```bash
git clone https://github.com/hello-wolrd-js/core.git
```

在根目录执行:
```bash
npm run build
```

client和admin的构建产物将出现在根目录/dist下
