exports.UsersPage = function (lista, d) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="UTF-8" />
        <title>Home</title>
        <link rel="stylesheet" type="text/css" href="w3.css" />
        <style>
        footer {
            position: fixed;
            width: 100%;
            bottom: 0;
        }
      </style>
        </head>
        <body>
            <div class="w3-card-4">

            <header class="w3-container w3-red">
            <center>
                <h1>
                    Users
                </h1>
            </center>
            </header>
    
            <center>
            <div id="myBar" class="w3-bar w3-border w3-black">
                <a href="/" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Tasks</span></a>
                <a href="/users" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Users</span></a>
            </div>
            </center>

            <table class="w3-table-all">
            <tr>
            <form class="w3-container" method="POST" action="http://localhost:7777/users">
            <fieldset>
                <legend>Insertion Form</legend>
                <label>Name</label>
                <input class="w3-input w3-round" type="text" name="name" />
            </fieldset>
            <button class="w3-btn w3-red w3-mb-2" type="submit">Insert</button>
        </form>
        
        </tr>
        <tr>
            <div class="w3-container">
            <table class="w3-table-all">
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
                `
    for (let i = 0; i < lista.length; i++) {
        pagHTML += `
        <tr>
            <td>${lista[i].id}</td>
            <td>
                ${lista[i].name}
            </td>
        </tr>
        `
    }

    pagHTML += `
                </tr>
                </table>
            </div>
            </table>

                <footer class="w3-container w3-red">
                    <center>
                        <h5>Generated in EngWeb2023 ${d}</h5>
                    </center>
                </footer>
            
            </div> 
        </body>
    </html>    
    `

    return pagHTML;
}

exports.homePage = function (tasks, users, d) {

    var pagHTML = `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8" />
        <title>Home</title>
        <link rel="stylesheet" type="text/css" href="w3.css" />
        <style>
        #maintable {
          border-collapse: collapse;
          width: 100%;
          table-layout: fixed;
        }
        #maintable.th, #maintable.td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
          width: 33.33%;
        }
        footer {
            position: fixed;
            width: 100%;
            bottom: 0;
        }
      </style>
    </head>
    
    <body>
        <div class="w3-card-4">
    

        <header class="w3-container w3-red">
        <center>
            <h1>
                Tasks
            </h1>
        </center>
        </header>

        <center>
        <div id="myBar" class="w3-bar w3-border w3-black">
            <a href="/" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Tasks</span></a>
            <a href="/users" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Users</span></a>
        </div>
        </center>

     
    
            <div class="w3-container">
                <table class="w3-table-all" id = "maintable">
                    <tr>
                    <form class="w3-container" method="POST" action="http://localhost:7777/">
                    <fieldset>
                        <legend>Insertion Form</legend>
                        <label>Due date</label>
                        <input class="w3-input w3-round" type="date" name="duedate" />
                        <label for="who">Who</label>
                        <select id="who" name="who" class="w3-input w3-round">
                            ${users.map(user => `<option value="${user.name}">${user.name}</option>`).join('')}
                        </select>
                        <label>What</label>
                        <input class="w3-input w3-round" type="text" name="what" />
                    </fieldset>
                    <button class="w3-btn w3-red w3-mb-2" type="submit">Insert</button>
                </form>
                
        </tr>
        <tr>
            <th>To do</th>
            <th>Already Done</th>
        </tr>
        <tr>
            <td>
            <table class="w3-table-all">
            <tr>
                            <th>What</th><th>DueDate</th><th>Who</th>
                            <th>Actions</th>
            </tr>
            `
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].done == false) {
            pagHTML += `<tr><td>${tasks[i].what}</td><td>${tasks[i].duedate}<td>${tasks[i].who}</td><td>[<a href="/tasks/edit/${tasks[i].id}">Edit</a>][<a href="/tasks/done/${tasks[i].id}">Done</a>][<a href="/tasks/delete/${tasks[i].id}">Delete</a>]</td>
            </tr>`
        }

    }
    pagHTML += `
    </table>
            </td >
            <td>
            <table class="w3-table-all">
            <tr>
                            <th>What</th><th>DueDate</th><th>Who</th>
                            <th>Actions</th>
            </tr>
            `
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].done == true) {
            pagHTML += `<tr><td>${tasks[i].what}</td><td>${tasks[i].duedate}<td>${tasks[i].who}</td><td>[<a href="/tasks/edit/${tasks[i].id}">Edit</a>][<a href="/tasks/undone/${tasks[i].id}">Undone</a>][<a href="/tasks/delete/${tasks[i].id}">Delete</a>]</td></tr>`
        }

    }
    pagHTML += `
    </table>
    </td>
        </tr >
    </table >
            </div >

        <footer class="w3-container w3-red">
        <center>
        <h5>Generated in EngWeb2023 ${d}</h5>
        </center>

        </footer>
    
        </div >
    </body >
    
    </html > `


    return pagHTML
}

exports.editPage = function (tasks, users, idTask, d) {
    var t = tasks.find(task => task.id === idTask)
    var pagHTML = `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8" />
        <title>Home</title>
        <link rel="stylesheet" type="text/css" href="w3.css" />
        <style>
        #maintable {
          border-collapse: collapse;
          width: 100%;
          table-layout: fixed;
        }
        #maintable.th, #maintable.td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
          width: 33.33%;
        }
        footer {
            position: fixed;
            width: 100%;
            bottom: 0;
        }
      </style>
    </head>
    
    <body>
        <div class="w3-card-4">
    
            <header class="w3-container w3-red">
            <center>
                <h1>
                    Tasks
                </h1>
            </center>
            </header>

            <center>
            <div id="myBar" class="w3-bar w3-border w3-black">
                <a href="/" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Tasks</span></a>
                <a href="/users" class="w3-bar-item w3-button w3-hover-white"><span class="w3-monospace">Users</span></a>
            </div>
            </center>
    
            <div class="w3-container">
                <table class="w3-table-all" id = "maintable">
                    <tr>
                    <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Edit Form</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${t.id}"/>
                        <label for="duedate">Due date</label>
                        <input class="w3-input w3-round" type="date" name="duedate" value="${t.duedate}">
                        <label for="who">Who</label>
                        <select id="who" name="who" class="w3-input w3-round">
                          ${users.map(user => `<option value="${user.name}" ${user.name === t.who ? 'selected' : ''}>${user.name}</option>`).join('')}
                        </select>
                        <label>What</label>
                        <input class="w3-input w3-round" type="text" name="what" value = "${t.what}"/>
                    </fieldset>
                    <button class="w3-btn w3-red w3-mb-2" type="submit">Edit</button>
                </form>
                
        </tr>
        <tr>
            <th>To do</th>
            <th>Already Done</th>
        </tr>
        <tr>
            <td>
            <table class="w3-table-all">
            <tr>
                            <th>What</th><th>DueDate</th><th>Who</th>
                            <th>Actions</th>
            </tr>
            `
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].done == false) {
            pagHTML += `<tr><td>${tasks[i].what}</td><td>${tasks[i].duedate}<td>${tasks[i].who}</td><td>[<a href="/tasks/edit/${tasks[i].id}">Edit</a>][<a href="/tasks/done/${tasks[i].id}">Done</a>]
            [<a href="/tasks/delete/${tasks[i].id}">Delete</a>]</td>
        </tr>`
        }

    }
    pagHTML += `
    </table>
            </td >
            <td>
            <table class="w3-table-all">
            <tr>
                            <th>What</th><th>DueDate</th><th>Who</th>
                            <th>Actions</th>
            </tr>
            `
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].done == true) {
            pagHTML += `<tr><td>${tasks[i].what}</td><td>${tasks[i].duedate}<td>${tasks[i].who}</td><td>[<a href="/tasks/edit/${tasks[i].id}">Edit</a>][<a href="/tasks/undone/${tasks[i].id}">Undone</a>][<a href="/tasks/delete/${tasks[i].id}">Delete</a>]</td></tr>`
        }

    }
    pagHTML += `
    </table>
    </td>
        </tr >
    </table >
            </div >

        <footer class="w3-container w3-red">
        <center>
            <h5>Generated in EngWeb2023 ${d}</h5>
        </center>
        </footer>
    
        </div >
    </body >
    
    </html > `


    return pagHTML
}
// -------------- Error Treatment ------------------------------
exports.errorPage = function (errorMessage, d) {
    return `
        < p > ${d}: Error: ${errorMessage}</p >
            `
}