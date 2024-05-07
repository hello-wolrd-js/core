## @hello-world-js/core

核心 monorepo 库, 使用 bun 作为包管理和后端运行时.

packages:

1. server(后端): bun,elysia,mongoose
2. web(管理端和客户端): solidjs,tailwind,daisyui

## TODO

-   [ ] 响应式导航栏布局
-   [x] 世界加载动画
-   [ ] 导航栏拓展插槽的过渡(有未知 bug)
-   [ ] 世界路由缓存

## 每个世界受到哪些限制?

1. 原生本地存储和会话存储 API 的访问:
   取而代之的是 HWJS 提供的 API 来读写本地存储以确保用户安全

## 部署

核心库支持两种部署方式

### 1.使用官方 docker 镜像(推荐)

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

client 和 admin 的构建产物将出现在根目录/dist 下
