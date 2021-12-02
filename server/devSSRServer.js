const express = require("express")
const fs = require("fs")
const app = express()

const { createServer: createViteServer } = require("vite")

createViteServer({
  server: {
    middlewareMode: 'ssr', // 使用html时只是启动了一个类似vite服务的东西， ssr是服务端渲染
  }
}).then((vite) => {
  app.use(vite.middlewares)

  app.get("*", async (req, res) => {
    let template = fs.readFileSync("index.html", "utf-8")
    
    template = await vite.transformIndexHtml(req.url, template)
    const { render } = await vite.ssrLoadModule("/src/server-entry.tsx")

    const html = await render(req.url)
    
    const responseHtml = template.replace("<!-- AppRender-->", html)
    
    res.set("content-type", "text/html").send(responseHtml)
  })
  app.listen(4000)

})
