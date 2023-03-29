var express = require('express');
var router = express.Router();
var Exame = require('../controllers/emd')


/* GET home page. */
router.get('/emds', function (req, res, next) {
  if (req.query.status === 'apto') {
    Exame.aptos()
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de exames." }));
  }
  else {
    Exame.list()
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de exames." }))
  }
});

router.get('/emds/modalidades', function (req, res, next) {
  Exame.modalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de exames." }))
});

router.get('/emds/aptos', function (req, res, next) {
  Exame.aptos()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de exames." }))
});


router.get('/emds/atletas', function (req, res, next) {
  Exame.atletas()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de exames." }))
});

router.get('/emds/:id', function (req, res, next) {
  Exame.getExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({ erro: erro, mensagem: "Não consegui obter o exame." }))
});

router.post('/emds', function (req, res, next) {
  Exame.addExame(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({ erro: erro, mensagem: "Não consegui inserir o exame." }))
});

router.put('/emds/:id', function (req, res) {
  console.log(req.body)
  Exame.updateExame(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({ erro: erro, mensagem: "Não consegui alterar o exame." }))
});

router.delete('/emds/:id', function (req, res, next) {
  Exame.deleteExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({ erro: erro, mensagem: "Não consegui apagar o exame." }))
});

module.exports = router;
