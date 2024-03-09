// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
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

// Server creationcompositores

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    
    } else{
        switch(req.method){
            case "GET": 
            // GET /compositores --------------------------------------------------------------------
            if ((req.url == '/') || (req.url == '/compositores'))  {
                axios.get('http://localhost:3000/compositores?_sort=nome')
                .then(resp => {
                    var compositores = resp.data
                    res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                    res.write(templates.compositoreslistPage(compositores, d))
                    res.end() // Aqui está o único res.end() após escrever toda a resposta
                })
                .catch(erro => {
                    res.writeHead(501, {"Content-Type" : "text/html; charset=utf8"})
                    res.write("<p>Não foi possível obter a lista de compositores" + req.method + "</p>")
                    res.write("<p>" + erro + "</p>")
                    res.end() // Aqui está o único res.end() em caso de erro
                })
            }
        

                // GET /compositores/:id --------------------------------------------------------------------
               
                else if (/\/compositores\/(C)[0-9]+$/i.test(req.url)) {
                    var id = req.url.split('/').pop();
                
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then(resp => {
                            var compositor = resp.data; 
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                            res.write(templates.compositoresPage(compositor, d)); 
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>Não foi possível obter o compositor</p>");
                            res.end("<p>" + error + "</p>");
                        });
                }

                // GET /compositores?periodo={periodo}
                else if (/\/compositores\?periodo=[A-Za-z]+$/i.test(req.url)) {
                    var periodo = req.url.split('=')[1];
                
                    axios.get(`http://localhost:3000/compositores?periodo=${periodo}`)
                        .then(resp => {
                            var compositores = resp.data; 
                            console.log(periodo)
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                            res.write(templates.compositoreslistPage(compositores, d)); 
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>Não foi possível obter os compositores</p>");
                            res.end("<p>" + error + "</p>");
                        });
                }                

                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == '/compositores/registo') {
                    res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"});
                    res.write(templates.compositorFormPage(d));
                    res.end();
                }

                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)) {
                    var id = req.url.split('/').pop();
                
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then(resp => {
                            var compositor = resp.data; 
                
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                            res.write(templates.compositorFormPage(compositor, d));
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>Não foi possível obter o compositor para edição</p>");
                            res.end("<p>" + error + "</p>");
                        });
                }                              

                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/(C)[0-9]+$/i.test(req.url)) {
                    // Extracting the ID from req.url
                    var id = req.url.split('/').pop();

                    axios.delete("http://localhost:3000/compositores/" + id)
                        .then(resp => {
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>Compositor excluído com sucesso</p>");
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>Não foi possível excluir o compositor</p>");
                            res.end("<p>" + error + "</p>");
                        });
                }

                // GET /periodos --------------------------------------------------------------------
                else if ((req.url == '/periodos'))  {
                    axios.get(`http://localhost:3000/periodos?_sort=id`)
                    .then(resp => {
                        var periodos = resp.data
                        res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                        res.write(templates.periodosListPage(periodos, d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(501, {"Content-Type" : "text/html; charset=utf8"})
                        res.write("<p>Não foi possível obter a lista de periodos" + req.method + "</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }

             
                  //GET /periodos/:id---------------------------------
                
                 else if (/\/periodos\/(P)[0-9]+$/i.test(req.url)) {
                      var id = req.url.split('/').pop();
                
                      axios.get("http://localhost:3000/periodos/" + id)
                          .then(resp => {
                              var periodo = resp.data; 
                              res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                              res.write(templates.periodosPage(periodo, d)); 
                              res.end();
                          })
                          .catch(error => {
                              res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                              res.write("<p>Não foi possível obter o periodo</p>");
                              res.end("<p>" + error + "</p>");
                          });
                  }

                  // GET /periodos/registo --------------------------------------------------------------------
                else if (req.url == '/periodos/registo') {
                    res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"});
                    res.write(templates.periodoFormPage(d));
                    res.end();
                }

                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/(P)[0-9]+$/i.test(req.url)) {
                    var id = req.url.split('/').pop();
                
                    axios.get("http://localhost:3000/periodos/" + id)
                        .then(resp => {
                            var periodo = resp.data; 
                
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                            res.write(templates.periodoFormPage(periodo, d));
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>Não foi possível obter o periodo para edição</p>");
                            res.end("<p>" + error + "</p>");
                        });
                }                              

                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if (/\/periodos\/delete\/(P)[0-9]+$/i.test(req.url)) {
                    // Extracting the ID from req.url
                    var id = req.url.split('/').pop();

                    axios.delete("http://localhost:3000/periodos/" + id)
                        .then(resp => {
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>periodo excluído com sucesso</p>");
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                            res.write("<p>Não foi possível excluir o periodo</p>");
                            res.end("<p>" + error + "</p>");
                        });
                }

              // GET ? -> Lancar um erro
                else {
                    res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"});
                    res.write("<p>Método GET não suportado: " + req.method + "</p>");
                    res.write("<p><a href='/'>Return</a></p>");
                    res.end();
                }
                break

            case "POST":
                // POST /compositores --------------------------------------------------------------------
                if ((req.url == '/') || (req.url == '/compositores'))  {
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                    .then(resp => {
                        var compositores = resp.data
                        res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"});
                        res.write(templates.compositoreslistPage(compositores, d));
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(501, {"Content-Type" : "text/html; charset=utf8"});
                        res.write("<p>Não foi possível obter a lista de compositores" + req.method + "</p>");
                        res.write("<p>" + erro + "</p>");
                        res.end();
                    })
                }
                // POST /compositores/:id --------------------------------------------------------------------
                else if (/\/compositores\/(C)[0-9]+$/i.test(req.url)) {
                    var id = req.url.split('/').pop();
                
                    collectRequestBodyData(req, result => {
                        if (result) {
                            // Se houver um ID na URL, isso pode ser uma atualização
                            if (id) {
                                axios.put("http://localhost:3000/compositores/" + id, result)
                                .then(resp => {
                                    console.log(resp.data)
                                    res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                                    res.end("Registro atualizado: " + JSON.stringify(resp.data) + "</p>")
                                })
                                .catch(erro => {
                                    res.writeHead(507, {"Content-Type" : "text/html; charset=utf8"})
                                    res.write("<p>Não foi possível atualizar o registro</p>")
                                    res.end("<p>" + erro + "</p>")
                                    res.end()
                                })
                            }
                        } else {
                            res.writeHead(502, {"Content-Type" : "text/html; charset=utf8"})
                            res.write("<p>Não foi possível obter os dados do body" + req.method + "</p>")
                            res.end()
                        }
                    });
                }

                // POST /compositores?periodo={periodo}
                else if (/\/compositores\?periodo=[A-Za-z]+$/i.test(req.url)) {
                    var periodo = req.url.split('=')[1];

                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/compositores", { periodo: periodo, ...result })
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(201, {"Content-Type" : "text/html; charset=utf8"})
                                res.end("Compositor criado com sucesso: " + JSON.stringify(resp.data) + "</p>")
                            })
                            .catch(erro => {
                                res.writeHead(503, {"Content-Type" : "text/html; charset=utf8"})
                                res.write("<p>Não foi possível criar o compositor</p>")
                                res.end("<p>" + erro + "</p>")
                            })
                        } else {
                            res.writeHead(502, {"Content-Type" : "text/html; charset=utf8"})
                            res.write("<p>Não foi possível obter os dados do corpo da solicitação</p>")
                            res.end()
                        }
                    });
                }

                // POST /compositores/registo --------------------------------------------------------------------
                if (req.url == '/compositores/registo') {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/compositores", result)
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(201, {"Content-Type" : "text/html; charset=utf8"})
                                res.end("Registo inserido: " + JSON.stringify(resp.data) + "</p>")
                            })
                            .catch(erro => {
                                res.writeHead(503, {"Content-Type" : "text/html; charset=utf8"})
                                res.write("<p>Não foi possível inserir o registo</p>")
                                res.end("<p>" + erro + "</p>")
                                res.end()
                            })
                        } else {
                            res.writeHead(502, {"Content-Type" : "text/html; charset=utf8"})
                            res.write("<p>Não foi possível obter os dados do body" + req.method + "</p>")
                            res.end()
                        }
                    })
                }

                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)) {
                    // Extrair o ID do URL da requisição
                    var id = req.url.split('/').pop();
                
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/compositores/" + id, result)
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                                res.end("Registro atualizado: " + JSON.stringify(resp.data) + "</p>")
                            })
                            .catch(erro => {
                                res.writeHead(507, {"Content-Type" : "text/html; charset=utf8"})
                                res.write("<p>Não foi possível atualizar o registro</p>")
                                res.end("<p>" + erro + "</p>")
                                res.end()
                            })
                        } else {
                            res.writeHead(506, {"Content-Type" : "text/html; charset=utf8"})
                            res.write("<p>Não foi possível obter os dados do body" + req.method + "</p>")
                            res.end()
                        }
                    });
                }

                // POST /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/(C)[0-9]+$/i.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/compositores/" + result.id, result)
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                                res.end("Registo inserido: " + JSON.stringify(resp.data) + "</p>")
                            })
                            .catch(erro => {
                                res.writeHead(507, {"Content-Type" : "text/html; charset=utf8"})
                                res.write("<p>Não foi possível apagar o registo</p>")
                                res.end("<p>" + erro + "</p>")
                                res.end()
                            })
                        } else {
                            res.writeHead(506, {"Content-Type" : "text/html; charset=utf8"})
                            res.write("<p>Não foi possível obter os dados do body" + req.method + "</p>")
                            res.end()
                        }
                    })
                    
                }

                                // POST /periodos --------------------------------------------------------------------
                else if ((req.url == '/') || (req.url == '/periodos')) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/periodos", result)
                            .then(resp => {
                                console.log(resp.data);
                                res.writeHead(201, {"Content-Type" : "text/html; charset=utf8"});
                                res.end("Período criado com sucesso: " + JSON.stringify(resp.data) + "</p>");
                            })
                            .catch(erro => {
                                res.writeHead(503, {"Content-Type" : "text/html; charset=utf8"});
                                res.write("<p>Não foi possível criar o período</p>");
                                res.end("<p>" + erro + "</p>");
                            });
                        } else {
                            res.writeHead(502, {"Content-Type" : "text/html; charset=utf8"});
                            res.write("<p>Não foi possível obter os dados do corpo da solicitação</p>");
                            res.end();
                        }
                    });
                }

                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/(P)[0-9]+$/i.test(req.url)) {
                    var id = req.url.split('/').pop();
                
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/periodos/" + id, result)
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                                res.end("Registro atualizado: " + JSON.stringify(resp.data) + "</p>")
                            })
                            .catch(erro => {
                                res.writeHead(507, {"Content-Type" : "text/html; charset=utf8"})
                                res.write("<p>Não foi possível atualizar o registro</p>")
                                res.end("<p>" + erro + "</p>")
                                res.end()
                            })
                        } else {
                            res.writeHead(506, {"Content-Type" : "text/html; charset=utf8"})
                            res.write("<p>Não foi possível obter os dados do body" + req.method + "</p>")
                            res.end()
                        }
                    });
                }

                // POST /periodos/delete/:id --------------------------------------------------------------------
                else if (/\/periodos\/delete\/(P)[0-9]+$/i.test(req.url)) {
                    // Extrair o ID do URL da requisição
                    var id = req.url.split('/').pop();
                
                    axios.delete("http://localhost:3000/periodos/" + id)
                    .then(resp => {
                        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
                        res.write("<p>Período excluído com sucesso</p>");
                        res.end();
                    })
                    .catch(error => {
                        res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
                        res.write("<p>Não foi possível excluir o período</p>");
                        res.end("<p>" + error + "</p>");
                    });
                }

                // POST /periodos/:id --------------------------------------------------------------------
                else if (/\/periodos\/(P)[0-9]+$/i.test(req.url)) {
                    var id = req.url.split('/').pop();
                
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/periodos/" + id, result)
                            .then(resp => {
                                console.log(resp.data);
                                res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"});
                                res.end("Período atualizado com sucesso: " + JSON.stringify(resp.data) + "</p>");
                            })
                            .catch(erro => {
                                res.writeHead(507, {"Content-Type" : "text/html; charset=utf8"});
                                res.write("<p>Não foi possível atualizar o período</p>");
                                res.end("<p>" + erro + "</p>");
                            });
                        } else {
                            res.writeHead(502, {"Content-Type" : "text/html; charset=utf8"});
                            res.write("<p>Não foi possível obter os dados do corpo da solicitação</p>");
                            res.end();
                        }
                    });
                }

                // POST ? -> Lancar um erro
                else {
                    res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                    res.write("<p>Método POST não sopurtado: " + req.method + "</p>")
                    res.write("<p><a href='/'>Return</a></p>")
                    res.end()
                }
                break
                
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {"Content-Type" : "text/html; charset=utf8"})
                res.write("<p>Método não suportado: " + req.method + "</p>")
                res.end()
                break
        }
    }
})

compositoresServer.listen(3040, ()=>{
    console.log("Servidor à escuta na porta 3040...")
})
