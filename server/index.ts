import { createServer } from 'vite'
const express = require('express')
const app = express()

createServer().then((middleware) => {
  app.listen(4000)
})

