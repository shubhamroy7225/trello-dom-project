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
app.use(express.static('public'))
.listen(process.env.PORT, () => {
    console.log("server started");
  });
  