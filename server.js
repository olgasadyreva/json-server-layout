const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db/db.json')
const middlewares = jsonServer.defaults()

// Настройка CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  
  // Обработка preflight запросов
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

server.use(middlewares)
server.use(router)

server.listen(4545, () => {
  console.log('JSON Server is running on http://localhost:4545')
  console.log('CORS enabled for all origins')
})
