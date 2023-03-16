// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

function maxID(list) {
    if (list.length == 0) return 1
    list.sort((a, b) => parseInt(b.id) - parseInt(a.id))
    return (parseInt(list[0].id) + 1).toString()
}

// Aux functions
function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var tasksServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    }
    else {
        switch (req.method) {
            case "GET":
                // GET /tasks --------------------------------------------------------------------
                if ((req.url == "/") || (req.url == "/tasks")) {
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            axios.get("http://localhost:3000/users?_sort=name")
                                .then(response => {
                                    var users = response.data
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write(templates.homePage(tasks, users, d))
                                    res.end()
                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                    res.end()

                                })

                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de tarefas.. Erro: " + erro)
                            res.end()
                        })
                }
                // GET /tasks/edit/:id --------------------------------------------------------------------
                else if (/\/tasks\/edit\/[0-9]+$/.test(req.url)) {
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            axios.get("http://localhost:3000/users?_sort=name")
                                .then(response => {
                                    var users = response.data
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write(templates.editPage(tasks, users, idTask, d))
                                    res.end()
                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                    res.end()

                                })

                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de tarefas.. Erro: " + erro)
                            res.end()
                        })
                }
                else if (/\/tasks\/done\/[0-9]+$/.test(req.url)) {
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            result = tasks.find(task => task.id === idTask)
                            result.done = true
                            axios.put('http://localhost:3000/tasks/' + result.id, result)
                                .then(resp => {
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            axios.get("http://localhost:3000/users?_sort=name")
                                                .then(response => {
                                                    var users = response.data
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write(templates.homePage(tasks, users, d))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                                    res.end()

                                                })
                                        })
                                })
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de tarefas.. Erro: " + erro)
                            res.end()
                        })
                }
                else if (/\/tasks\/undone\/[0-9]+$/.test(req.url)) {
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            result = tasks.find(task => task.id === idTask)
                            result.done = false
                            axios.put('http://localhost:3000/tasks/' + result.id, result)
                                .then(resp => {
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            axios.get("http://localhost:3000/users?_sort=name")
                                                .then(response => {
                                                    var users = response.data
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write(templates.homePage(tasks, users, d))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                                    res.end()

                                                })
                                        })
                                })
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de tarefas.. Erro: " + erro)
                            res.end()
                        })
                }
                else if (/\/users$/.test(req.url)) {
                    axios.get("http://localhost:3000/users?_sort=name")
                        .then(response => {
                            var users = response.data
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.end(templates.UsersPage(users, d))
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de utilizadores.. Erro: " + erro)
                            res.end()
                        })
                }
                else if (/\/tasks\/delete\/[0-9]+$/.test(req.url)) {
                    var idTask = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/tasks/' + idTask)
                        .then(resp => {
                            axios.get('http://localhost:3000/tasks')
                                .then(resp => {
                                    tasks = resp.data
                                    axios.get('http://localhost:3000/users')
                                        .then(resp => {
                                            users = resp.data
                                            res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.end(templates.homePage(tasks, users, d))
                                        })
                                        .catch(error => {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + error)
                                            res.end()
                                        })
                                })
                                .catch(error => {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + error)
                                    res.end()
                                })
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.end(templates.errorPage("Unable to delete record: " + idTask, d))
                        })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if ((req.url == "/") || (req.url == "/tasks")) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.get("http://localhost:3000/tasks")
                                .then(response => {
                                    var tasks = response.data
                                    result.done = false
                                    result.id = maxID(tasks)
                                    axios.post('http://localhost:3000/tasks', result)
                                        .then(resp => {
                                            axios.get("http://localhost:3000/tasks")
                                                .then(response => {
                                                    var tasks = response.data
                                                    axios.get("http://localhost:3000/users?_sort=name")
                                                        .then(response => {
                                                            var users = response.data
                                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                            res.write(templates.homePage(tasks, users, d))
                                                            res.end()
                                                        })
                                                        .catch(function (erro) {
                                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                            res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                                            res.end()

                                                        })
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de tarefas.. Erro: " + erro)
                                                    res.end()
                                                })
                                        })
                                        .catch(error => {
                                            console.log('Erro: ' + error);
                                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Unable to insert record...</p>")
                                            res.end()
                                        });
                                })
                        }
                        else {
                            res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if (/\/tasks\/edit\/[0-9]+$/.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if (result) {

                            result.done = false
                            axios.put('http://localhost:3000/tasks/' + result.id, result)
                                .then(resp => {
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            axios.get("http://localhost:3000/users?_sort=name")
                                                .then(response => {
                                                    var users = response.data
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write(templates.homePage(tasks, users, d))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                                    res.end()

                                                })
                                        })
                                })
                        }
                        else {
                            res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if (/\/users$/.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.get("http://localhost:3000/users?_sort=name")
                                .then(response => {
                                    var users = response.data
                                    result.id = maxID(users)
                                    axios.post('http://localhost:3000/users', result)
                                        .then(resp => {
                                            axios.get("http://localhost:3000/users?_sort=name")
                                                .then(response => {
                                                    var users = response.data
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write(templates.UsersPage(users, d))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de utilizadores.. Erro: " + erro)
                                                    res.end()
                                                })
                                        })
                                        .catch(error => {
                                            console.log('Erro: ' + error);
                                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Unable to insert record...</p>")
                                            res.end()
                                        });
                                })
                        }
                        else {
                            res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }

})

tasksServer.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777...")
})



