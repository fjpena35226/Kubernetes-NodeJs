const express = require('express')
const cors = require('cors')

const router = require('./src/routes')
const path = require('path')

const { json, urlencoded } = express
const app = express()

const host = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: false }))

const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

app.use(router)

app.get('/healthcheck', (req, res) => res.send('ok'))

app.get('/authors', (req, res) => res.send('Francisco'))

app.use('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/html/index.html'))
})
app.use('/', (req, res) => {
  res.send(`I Love Docker & Kubernetes & NodeJs`)
})

app.listen(port, host, () => {
  console.log(`Server listening on port ${port} in the host ${host}`)
})
