var express = require('express');
var router = express.Router();
var Person = require('../controllers/pessoa')

router.get('/', function (req, res, next) {
  Person.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de pessoas." }))
});

/* GET home page. */
router.get('/pessoas', function (req, res, next) {
  Person.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de pessoas." }))
});

router.get('/pessoas/:id', function (req, res, next) {
  Person.getPerson(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({ erro: erro, mensagem: "Não consegui obter a pessoa." }))
});

router.post('/', function (req, res, next) {
  Person.addPerson(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({ erro: erro, mensagem: "Não consegui inserir a pessoa." }))
});

router.post('/pessoas', function (req, res, next) {
  Person.addPerson(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({ erro: erro, mensagem: "Não consegui inserir a pessoa." }))
});

router.put('/pessoas/:id', function (req, res) {
  console.log(req.body)
  Person.updatePerson(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({ erro: erro, mensagem: "Não consegui alterar a pessoa." }))
});

router.delete('/pessoas/:id', function (req, res, next) {
  Person.deletePerson(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({ erro: erro, mensagem: "Não consegui apagar a pessoa." }))
});

module.exports = router;