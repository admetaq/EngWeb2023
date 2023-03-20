var express = require('express');
var router = express.Router();
var Tasks = require('../controllers/tasks')
var Users = require('../controllers/users')

function maxID(list) {
  if (list.length == 0) return 1
  list.sort((a, b) => parseInt(b.id) - parseInt(a.id))
  return (parseInt(list[0].id) + 1).toString()
}

/* GET home page. */
router.get('/', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tasks.list()
    .then(tasks => {
      Users.list()
        .then(users => {
          res.render('index', { tasks: tasks, d: data, users: users });
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro na obtenção da lista de users" })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da lista de tasks" })
    })
});


/* GET Users page */
router.get('/users/', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Users.list()
    .then(users => {
      res.render('users', { d: data, users: users });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da lista de users" })
    })
});



/* GET task update page. */
router.get('/tasks/edit/:idTask', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)

  Tasks.list()
    .then(tasks => {
      Users.list()
        .then(users => {

          Tasks.getTask(req.params.idTask)
            .then(task => {
              res.render('edit', { t: task, tasks: tasks, users: users, d: data });
            })
            .catch(erro => {
              res.render('error', { error: erro, message: "Erro na obtenção da task" })
            })
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro na obtenção da lista de users" })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da lista de tasks" })
    })
});

/* GET a task done */
router.get('/tasks/done/:idTask', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)

  Tasks.getTask(req.params.idTask)
    .then(task => {
      task.done = true
      Tasks.updateTask(task)
        .then(t => { res.redirect('/') })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro na edição da task" })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da task" })
    })
});

/* GET a task undone */
router.get('/tasks/undone/:idTask', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)

  Tasks.getTask(req.params.idTask)
    .then(task => {
      task.done = false
      Tasks.updateTask(task)
        .then(t => { res.redirect('/') })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro na edição da task" })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da task" })
    })
});

/* GET a task deleted */
router.get('/tasks/delete/:idTask', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)

  Tasks.getTask(req.params.idTask)
    .then(task => {
      Tasks.deleteTask(task.id)
        .then(t => { res.redirect('/') })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro na remoção da task" })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro na obtenção da task" })
    })
});


/* POST Student Form */
router.post('/', (req, res) => {
  var data = new Date().toISOString().substring(0, 16)
  Tasks.list()
    .then(tasks => {
      var task = req.body
      task.id = maxID(tasks)
      Tasks.addTask(task)
        .then(aluno => {
          res.redirect('/')
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro no armazenamento do registo de task" })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro ao obter a lista de tasks" })
    })

})


router.post('/tasks/edit/:idTask', (req, res) => {
  var data = new Date().toISOString().substring(0, 16)
  Tasks.updateTask(req.body)
    .then(t => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro no armazenamento do edição da task" })
    })
})


/* POST Student Update Form */
router.post('/users/', (req, res) => {
  var data = new Date().toISOString().substring(0, 16)
  Users.list()
    .then(users => {
      var user = req.body
      user.id = maxID(users)
      Users.addUser(user)
        .then(aluno => {
          res.redirect('/users')
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro no armazenamento do registo de user" })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro ao obter a lista de users" })
    })

})

module.exports = router;
