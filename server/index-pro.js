const express = require("express")
const fs = require("fs")

const app = express()

const template = fs.readFileSync('dist/client/index.html', 'utf-8')

app.use(express.static('dist/client'))

app.get("*", async (req, res) => {
  const render = require('./dist/server/server-entry')

  const context = {}
  const html = await render(req.url, context)

  if (context.url) {
    res.redirect(301, context.url)
    return
  }
  const responseHtml = template.replace('<!-- AppRender-->', html)

  res.set("content-type", "text/html").send(responseHtml)
})

app.listen(4000)