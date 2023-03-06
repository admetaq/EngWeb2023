var http = require('http');
var axios = require('axios');
var mypages = require('./mypages');
var fs = require('fs');

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d)
    if (req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(mypages.genHomePage(d))
    }
    else if (req.url == '/pessoas') {
        axios.get('http://localhost:3000/pessoas')
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(mypages.genPersonsPage(pessoas, d, "Lista de Pessoas"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/pessoasOrdenadas') {
        axios.get('http://localhost:3000/pessoas?_sort=nome')
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(mypages.genPersonsPage(pessoas, d, "Lista de Pessoas Ordenada"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/distSexo') {
        axios.get('http://localhost:3000/pessoas')
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(mypages.genDistributionPage(mypages.genDistribution(pessoas, "sexo", true, -1), d, "sexo", true, "Distribuição Por Sexo"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/distDesporto') {
        axios.get('http://localhost:3000/pessoas')
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(mypages.genDistributionPage(mypages.genDistribution(pessoas, "desportos", false, -1), d, "desportos", false, "Distribuição Por Desporto"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/top10Profissao') {
        axios.get('http://localhost:3000/pessoas')
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(mypages.genDistributionPage(mypages.genDistribution(pessoas, "profissao", true, 10), d, "profissao", true, "Top 10 Profissões"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url.match(/\/pessoas\/p\d+/)) {
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function (resp) {
                var pessoa = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(mypages.genPersonPage(pessoa, d));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if ((found = decodeURIComponent(req.url).match(/\/(?<parametro>[a-z]+)(?<multivalor>_like)?=(?<pesquisa>.+)$/))) {
        axios.get('http://localhost:3000/pessoas?_sort=nome')
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                var parametro = found.groups.parametro
                var multivalor = found.groups.multivalor
                var pesquisa = found.groups.pesquisa
                if (multivalor == undefined) {
                    res.end(mypages.genPersonsPage(mypages.genFilteredList(pessoas, parametro, pesquisa, true), d, pesquisa.charAt(0).toUpperCase() + pesquisa.slice(1)))
                }
                else {
                    res.end(mypages.genPersonsPage(mypages.genFilteredList(pessoas, parametro, pesquisa, false), d, pesquisa.charAt(0).toUpperCase() + pesquisa.slice(1)))
                }
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })

    }
    else if (req.url.match(/\/w3.css$/)) {
        fs.readFile('w3.css', function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro na leitura do ficheiro: " + err + "</p>")
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/css;' })
                res.end(data)
            }
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<p>Operação não suportada: ' + req.url + '</p>');
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");
