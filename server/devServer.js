// 启动一个viteDevServer
const express = require("express")
const app = express()

const { createServer: createViteServer } = require("vite")

createViteServer({
  server: {
    middlewareMode: 'html', // 使用html时只是启动了一个类似vite服务的东西， ssr是服务端渲染
  }
}).then((vite) => {
  app.use(vite.middlewares)
  app.listen(4000)
})