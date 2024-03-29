var http = require('http');
var url = require('url');
var axios = require('axios')

http.createServer((req, res) => {
    console.log(res.method + " " + req.url + " ");

    var q = url.parse(req.url, true)

    if(q.pathname == "/") {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'})
        res.write("<h1>Escolha uma opção</h1>");
        res.write("<ul>");
        res.write("<li><a href='/alunos'>Ver Alunos</a></li>");
        res.write("<li><a href='/instrumentos'>Ver Instrumentos</a></li>");
        res.write("<li><a href='/cursos'>Ver Cursos</a></li>");
        res.write("</ul>");
        res.end(); 

    } else if(q.pathname == "/alunos"){
        // Lista cidades
        axios.get("http://localhost:3000/alunos")
        .then( (resp) =>{
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'})
            let lista = resp.data
            res.write("<h1>Lista de Alunos</h1>")
            res.write("<ul>")
            for(i in lista){
                res.write(`<li><a href="/alunos/${lista[i].id}">${lista[i].nome}</a></li>`);
            }
            res.write("</ul>")
            res.write("<h6><a href='/'>Voltar</a></h6>")
            res.end()
        }).catch( erro =>{
            console.log("Erro: " + erro);
        });
    } else if (q.pathname.startsWith("/alunos/")) { 
        var alunoId = q.pathname.substring(8); 
        axios.get("http://localhost:3000/alunos/" + alunoId)
            .then((resp) => { 
                let aluno = resp.data;
                if (aluno) {
                    let htmlContent = `
                    <html>
                    <head>
                        <title>Informações do Aluno</title>
                    </head>
                    <body>
                        <h1>${aluno.nome}</h1>
                        <p>ID: ${aluno.id}</p>
                        <p>Data de Nascimento: ${aluno.dataNasc}</p>
                        <p>Curso: ${aluno.curso}</p>
                        <p>Ano do Curso: ${aluno.anoCurso}</p>
                        <p>Instrumento: ${aluno.instrumento}</p>
                        <h6><a href="/">Voltar</a></h6> 
                    </body>
                    </html>
                `;
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
                res.end(htmlContent); 
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' }); 
                    res.end("Aluno não encontrado"); 
                }
            }).catch(erro => { 
                console.log("Erro: " + erro); 
            });
        } else if (q.pathname == "/instrumentos") {
            // Lista intrumentos
            axios.get("http://localhost:3000/instrumentos")
            .then( (resp) =>{
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'})
                let lista = resp.data
                res.write("<h1>Lista de Instrumentos</h1>")
                res.write("<ul>")
                for(i in lista){
                    res.write(`<li><a href="/instrumentos/${lista[i].id}">${lista[i]["#text"]}</a></li>`);
                }
                res.write("</ul>")
                res.write("<h6><a href='/'>Voltar</a></h6>")
                res.end()
            }).catch( erro =>{
                console.log("Erro: " + erro);
            });
        } else if (q.pathname.startsWith("/instrumentos/")) { 
            var instrumentoId= q.pathname.substring(14); 
            axios.get("http://localhost:3000/instrumentos/" + instrumentoId)
                .then((resp) => { 
                    let instrumento = resp.data;
                    if (instrumento) {
                        let htmlContent = `
                        <html>
                        <head>
                            <title>Informações do Instrumento</title>
                        </head>
                        <body>
                            <h1>${instrumento["#text"]}</h1>
                            <p>ID: ${instrumento.id}</p>
                            <h6><a href="/">Voltar</a></h6> 
                        </body>
                        </html>
                    `;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
                    res.end(htmlContent); 
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/plain' }); 
                        res.end("Instrumento não encontrado"); 
                    }
                }).catch(erro => { 
                    console.log("Erro: " + erro); 
                });
        
        } else if(q.pathname == "/cursos"){
            // Lista cursos
            axios.get("http://localhost:3000/cursos")
            .then( (resp) =>{
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'})
                let lista = resp.data
                res.write("<h1>Lista de Cursos</h1>")
                res.write("<ul>")
                for(i in lista){
                    res.write(`<li><a href="/cursos/${lista[i].id}">${lista[i].designacao}</a></li>`);
                }
                res.write("</ul>")
                res.write("<h6><a href='/'>Voltar</a></h6>")
                res.end()
            }).catch( erro =>{
                console.log("Erro: " + erro);
            });
        } else if (q.pathname.startsWith("/cursos/")) { 
            var cursoId= q.pathname.substring(8); 
            axios.get("http://localhost:3000/cursos/" + cursoId)
                .then((resp) => { 
                    let curso = resp.data;
                    if (curso) {
                        let htmlContent = `
                        <html>
                        <head>
                            <title>Informações do Curso</title>
                        </head>
                        <body>
                            <h1>${curso.designacao}</h1>
                            <p>ID: ${curso.id}</p>
                            <p>Duração: ${curso.duracao}</p>
                            <p>ID do Instrumento: ${curso.instrumento.id}</p>
                            <p>Designação do Instrumento: ${curso.instrumento["#text"]}</p>
                            <h6><a href="/">Voltar</a></h6> 
                        </body>
                        </html>
                    `;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
                    res.end(htmlContent); 
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/plain' }); 
                        res.end("Curso não encontrado"); 
                    }
                }).catch(erro => { 
                    console.log("Erro: " + erro); 
                });
        } else {
            // Caso o caminho não seja encontrado
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("404 - Página não encontrada");
        }

}).listen(1902); 

console.log("Servidor à escuta na porta 1902...");