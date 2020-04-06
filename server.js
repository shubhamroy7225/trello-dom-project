const express = require('express')
const app = express()
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/index.html')
})
app.get('/css', function (req, res) {
  res.sendFile(__dirname + '/src/style.css')
})
app.get('/javascript', function (req, res) {
  res.sendFile(__dirname + '/src/script.js')
})
app.get('/img', function (req, res) {
  res.sendFile(__dirname + 'img/d5ae8190f0aa7dfbe0b01f336f29d44094b967b5.webp')
})
app.use(express.static('public'))
.listen(process.env.PORT, () => {
    console.log("server started");
  });
  