var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Compositor.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/', function(req, res, next) {
  Compositor.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  Compositor.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  Compositor.delete(req.params.id)
    .then(console.log('Compositor eliminado com sucesso!'))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
