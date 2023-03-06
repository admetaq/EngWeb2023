// mypages.js
// 03/03/2023 por rcs
// HTML templates generating functions

exports.genPersonsPage = function (lista, data, titulo) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>

            <style>
            .sticky {
                position: fixed;
                top: 0;
                width: 100%;
            }
            footer {
                position: fixed;
                width: 100%;
                bottom: 0;
            }
        </style>

        <script>
            window.addEventListener('scroll', function() {
                var headerHeight = document.querySelector('header').offsetHeight;
                var myBar = document.querySelector('#myBar');
                if (window.pageYOffset > headerHeight) {
                myBar.classList.add('sticky');
                } else {
                myBar.classList.remove('sticky');
                }
            });
        </script>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-amber">
                    <center>
                        <h1>${titulo}</h1>
                    </center>
                </header>
            
                <center>
                <div id="myBar" class="w3-bar w3-border w3-black">
                    <a href="/" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Home</span></a>
                    <a href="/pessoas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas</span></a>
                    <a href="/pessoasOrdenadas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas ordenada</span></a>
                    <a href="/distSexo" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por sexo</span></a>
                    <a href="/distDesporto" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por desporto</span></a>
                    <a href="/top10Profissao" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Top 10 Profissões</span></a>
                </div>
              
                </center>

            <div class="w3-container">
            <table class="w3-table-all">
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Cidade</th>
            </tr>
                `
    for (let i = 0; i < lista.length; i++) {
        pagHTML += `
        <tr>
            <td>${lista[i].id}</td>
            <td>
                <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
            </td>
            <td>${lista[i].idade}</td>
            <td>${lista[i].sexo}</td>
            <td>${lista[i].morada.cidade}</td>
        </tr>
        `
    }

    pagHTML += `
                </table>
            </div>
            
                <footer class="w3-container w3-amber">
                    <center>
                        <h5>Generated in EngWeb2023 ${data}</h5>
                    </center>
                </footer>
            
            </div> 
        </body>
    </html>    
    `

    return pagHTML;
}

exports.genPersonPage = function (p, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>

            <style>
            .sticky {
                position: fixed;
                top: 0;
                width: 100%;
            }
            footer {
                position: fixed;
                width: 100%;
                bottom: 0;
            }
        </style>

        <script>
            window.addEventListener('scroll', function() {
                var headerHeight = document.querySelector('header').offsetHeight;
                var myBar = document.querySelector('#myBar');
                if (window.pageYOffset > headerHeight) {
                myBar.classList.add('sticky');
                } else {
                myBar.classList.remove('sticky');
                }
            });
        </script>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-amber">
                    <center>
                        <h1>${p.nome}</h1>
                    </center>
                </header>

                <center>
                <div id="myBar" class="w3-bar w3-border w3-black">
                    <a href="/" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Home</span></a>
                    <a href="/pessoas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas</span></a>
                    <a href="/pessoasOrdenadas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas ordenada</span></a>
                    <a href="/distSexo" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por sexo</span></a>
                    <a href="/distDesporto" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por desporto</span></a>
                    <a href="/top10Profissao" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Top 10 Profissões</span></a>
                </div>
              
                </center>

                <div class="w3-responsive">
                <table class="w3-table-all w3-card-4">
            
                `
    Object.keys(p).forEach(parametro => {
        pagHTML += ` <tr>
        <th>${parametro}:</th>
        <td>
        <ul class="w3-ul">`
        if (Array.isArray(p[parametro])) {
            let i = 0

            for (i; i < p[parametro].length; i++) {
                pagHTML += `<li>${p[parametro][i]}</li>`
            }
        }
        else if (typeof p[parametro] === 'object') {

            for (let chave in p[parametro]) {
                pagHTML += `<li><strong>${chave}</strong> : ${p[parametro][chave]}</li>`
            }

        }
        else {
            pagHTML += `<li>${p[parametro]}</li>`
        }
        pagHTML += `
        </ul>
        </td>
        </tr >
            `
    });
    pagHTML += `
                </table >
            </div >

            <footer class="w3-container w3-amber">
                <center>
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </center>
            </footer>
            
            </div > 
        </body >
    </html >
            `

    return pagHTML;
}

exports.genHomePage = function (data) {
    var pagHTML = `<!DOCTYPE html>
            <html>

                <head>
                    <meta charset="UTF-8" />
                    <title>Home</title>
                    <link rel="stylesheet" type="text/css" href="w3.css" />

                    <style>
                        .sticky {
                            position: fixed;
                            top: 0;
                            width: 100%;
                        }
                        footer {
                            position: fixed;
                            width: 100%;
                            bottom: 0;
                        }
                    </style>

                    <script>
                        window.addEventListener('scroll', function() {
                            var headerHeight = document.querySelector('header').offsetHeight;
                            var myBar = document.querySelector('#myBar');
                            if (window.pageYOffset > headerHeight) {
                            myBar.classList.add('sticky');
                            } else {
                            myBar.classList.remove('sticky');
                            }
                        });
                    </script>


                </head>

                <body>
                    <div class="w3-card-4">

                        <header class="w3-container w3-amber">
                            <center>
                                <h1>Home</h1>
                            </center>
                        </header>

                        <center>
                        <div id="myBar" class="w3-bar w3-border w3-black">
                            <a href="/" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Home</span></a>
                            <a href="/pessoas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas</span></a>
                            <a href="/pessoasOrdenadas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas ordenada</span></a>
                            <a href="/distSexo" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por sexo</span></a>
                            <a href="/distDesporto" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por desporto</span></a>
                            <a href="/top10Profissao" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Top 10 Profissões</span></a>
                        </div>
                      
                        </center>


                        <footer class="w3-container w3-amber footer">
                            <center>
                                <h5>Generated in EngWeb2023 ${data}</h5>
                            </center>
                        </footer>
                    </div>
                </body>

            </html>`

    return pagHTML
}

exports.genDistributionPage = function (dist, data, parametro, valorUnico, titulo) {

    parametroQ = parametro
    if (!valorUnico) parametroQ += "_like"
    var pagHTML = `
                <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="UTF-8" />
                            <title>${titulo}</title>
                            <link rel="stylesheet" type="text/css" href="w3.css" />

                            <style>
                            .sticky {
                                position: fixed;
                                top: 0;
                                width: 100%;
                            }
                            footer {
                                position: fixed;
                                width: 100%;
                                bottom: 0;
                            }
                        </style>
    
                        <script>
                            window.addEventListener('scroll', function() {
                                var headerHeight = document.querySelector('header').offsetHeight;
                                var myBar = document.querySelector('#myBar');
                                if (window.pageYOffset > headerHeight) {
                                myBar.classList.add('sticky');
                                } else {
                                myBar.classList.remove('sticky');
                                }
                            });
                        </script>
                        </head>
                        <body>
                            <div class="w3-card-4">

                                <header class="w3-container w3-amber">
                                    <center>
                                        <h1>${titulo}</h1>
                                    </center>
                                </header>

                                <center>
                                <div id="myBar" class="w3-bar w3-border w3-black">
                                    <a href="/" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Home</span></a>
                                    <a href="/pessoas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas</span></a>
                                    <a href="/pessoasOrdenadas" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Lista de pessoas ordenada</span></a>
                                    <a href="/distSexo" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por sexo</span></a>
                                    <a href="/distDesporto" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Distribuição por desporto</span></a>
                                    <a href="/top10Profissao" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Top 10 Profissões</span></a>
                                </div>
                                </center>

                                <table class="w3-table-all w3-centered">
                                    <tr>
                                        <th>${parametro.charAt(0).toUpperCase() + parametro.slice(1)}</th>
                                        <th>Quantidade</th>
                                    </tr>

                                    `
    for (const [chave, valor] of dist) {
        pagHTML += `<tr>
                        <td>${chave}</td>
                        <td><a href="/${parametroQ}=${chave}">${valor}</a></td>
                    </tr>`
    }

    pagHTML += `
                                </table>

                                <footer class="w3-container w3-amber">
                                    <center>
                                        <h5>Generated in EngWeb2023 ${data}</h5>
                                    </center>
                                </footer>

                            </div>
                        </body>
                    </html>
        `

    return pagHTML;
}

exports.genDistribution = function (lista, parametro, valorUnico, top) {
    var dist = new Map()


    for (let i = 0; i < lista.length; i++) {
        if (valorUnico) {
            if (!dist.has(lista[i][parametro])) {
                dist.set(lista[i][parametro], 1)
            }
            else dist.set(lista[i][parametro], dist.get(lista[i][parametro]) + 1)
        }
        else {
            multivalorList = new Array()
            for (let j = 0; j < lista[i][parametro].length; j++) {
                if (!multivalorList.includes(lista[i][parametro][j])) {
                    if (!dist.has(lista[i][parametro][j])) {
                        dist.set(lista[i][parametro][j], 1)
                    }
                    else dist.set(lista[i][parametro][j], dist.get(lista[i][parametro][j]) + 1)
                    multivalorList.push(lista[i][parametro][j])
                }
            }
        }

    }


    const distOrd = Array.from(dist).sort((a, b) => b[1] - a[1]);

    if (top > 0) return distOrd.slice(0, top)

    return distOrd
}

exports.genFilteredList = function (lista, parametro, pesquisa, valorUnico) {
    listaFiltrada = new Array()
    for (let i = 0; i < lista.length; i++) {
        if (valorUnico) {
            if (lista[i][parametro] == pesquisa) {
                listaFiltrada.push(lista[i])
            }
        }
        else {
            let found = false
            for (let j = 0; j < lista[i][parametro].length && !found; j++) {
                if (lista[i][parametro][j] == pesquisa) {
                    found = true
                    listaFiltrada.push(lista[i])
                }
            }
        }
    }
    return listaFiltrada
}