var http = require('http')
var url = require('url')
var fs = require('fs')

var myServer = http.createServer(function (req, res) {
    var date = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + date)

    var pedido = url.parse(req.url, true).pathname

    if (pedido == "/") {
        fs.readFile('./Cidades/index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset =utf8' })
            if (err) {
                res.write("ERRO: na leitura do ficheiro :: " + err)
            }
            else {
                res.write(data)
            }
            res.end()
        })
    } else {
        pagina = pedido.substring(1)
        fs.readFile('./Cidades/' + pagina + '.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset =utf8' })
            if (err) {
                res.write("ERRO: na leitura do ficheiro :: " + err)
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
})

myServer.listen(7777)

console.log("Servidor à escuta na  porta 7777...")