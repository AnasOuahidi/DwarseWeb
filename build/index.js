const port = process.env.PORT || 8888
const host = process.env.HOST || 'localhost'
const path = require('path')
const express = require('express')
const morgan = require('morgan')
let app = express()
app.use(morgan('dev'))
app.use('/assets', express.static(__dirname + '/../assets'))
app.use('/../index.html', express.static(__dirname + '/../index.html'))
app.get('/prod', (req, res) => {
    res.sendFile(path.join(__dirname + '/../assets/index.html'))
})
app.get('/dev', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'))
})
app.listen(port, () => {
    console.log(`Visitez: http://${host}:${port}/dev/ pour l'environement de développement`)
    console.log(`Visitez: http://${host}:${port}/prod/ pour l'environement de production`)
    console.log(`Mais lancer npm run build avant ;)`)
})