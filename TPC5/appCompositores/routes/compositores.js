var express = require('express');
var router = express.Router();
var axios = require("axios");


/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores?_sort=nome')
    .then(resp => {
      var compositores = resp.data
      res.status(200).render("compositoresListPage", {"lCompositores" : compositores, "date" : d})
    })
    .catch(erro => {
      res.status(501).render("error", {"error" : erro})
    })
});


router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("compositoresFormPage", {"date" : d})
});


router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.post("http://localhost:3000/compositores", result)
    .then(resp => {
      console.log(resp.data)
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(502).render("error", {"error" : erro})
    })
});


router.get('/:idcompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.idcompositor)
    .then(resp => {
      var compositor = resp.data
      res.status(200).render("compositoresPage", {"compositor" : compositor, "date" : d})
    })
    .catch(erro => {
      res.status(503).render("error", {"error" : erro})
    })
});


router.get('/edit/:idcompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.idcompositor)
    .then(resp => {
      var compositor = resp.data
      res.status(200).render("compositoresFormEditPage", {"compositor" : compositor, "date" : d})
    })
    .catch(erro => {
      res.status(504).render("error", {"error" : erro})
    })
});


router.post('/edit/:idcompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var compositor = req.body
  axios.get('http://localhost:3000/compositores/' + req.params.idcompositor)
    .then(resp => {
      res.status(200).redirect('/')
    })
    .catch(erro => {
      res.status(506).render("error", {"error" : erro})
    })
});


router.get('/delete/:idcompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/compositores/' + req.params.idcompositor)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      res.status(505).render("error", {"error" : erro})
    })
});


//PERIODOS--------------------------------------------------------



/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos?_sort=periodo')
    .then(resp => {
      var periodos = resp.data
      res.status(200).render("periodosListPage", {"lPeriodos" : periodos, "date" : d})
    })
    .catch(erro => {
      res.status(501).render("error", {"error" : erro})
    })
});


router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("periodosFormPage", {"date" : d})
});


router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.post("http://localhost:3000/periodos", result)
    .then(resp => {
      console.log(resp.data)
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(502).render("error", {"error" : erro})
    })
});


router.get('/:idperiodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.idperiodo)
    .then(resp => {
      var compositor = resp.data
      res.status(200).render("periodosPage", {"periodo" : periodo, "date" : d})
    })
    .catch(erro => {
      res.status(503).render("error", {"error" : erro})
    })
});


router.get('/edit/:idperiodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.idperiodo)
    .then(resp => {
      var periodo = resp.data
      res.status(200).render("periodosFormEditPage", {"periodo" : periodo, "date" : d})
    })
    .catch(erro => {
      res.status(504).render("error", {"error" : erro})
    })
});


router.post('/edit/:idperiodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var periodo = req.body
  axios.get('http://localhost:3000/periodos/' + req.params.idperiodo)
    .then(resp => {
      res.status(200).redirect('/')
    })
    .catch(erro => {
      res.status(506).render("error", {"error" : erro})
    })
});


router.get('/delete/:idperiodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/periodos/' + req.params.idperiodo)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      res.status(505).render("error", {"error" : erro})
    })
});


module.exports = router;

