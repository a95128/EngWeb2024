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
        res.write("<li><a href='/filmes'>Ver Filmes</a></li>");
        res.write("<li><a href='/atores'>Ver Atores</a></li>");
        res.write("<li><a href='/generos'>Ver Géneros</a></li>");
        res.write("</ul>");
        res.end(); 

    } else if(q.pathname == "/filmes"){
    axios.get("http://localhost:3000/filmes")
    .then(resp => {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'})
            let lista = resp.data
            res.write("<h1>Lista de filmes</h1>")
            res.write("<ul>")
            for(i in lista){
                res.write(`<li><a href="/filmes/${lista[i].id}">${lista[i].title}</a></li>`);
            }
            res.write("</ul>")
            res.write("<h6><a href='/'>Voltar</a></h6>")
            res.end()
        }).catch( erro =>{
            console.log("Erro: " + erro);
        });
    } else if (q.pathname.startsWith("/filmes/")) { 
        var alunoId = q.pathname.substring(8); 
        axios.get("http://localhost:3000/filmes/" + alunoId)
            .then((resp) => { 
        let filme = resp.data;
        if (filme) {
            let cast = filme.cast ? filme.cast.map(actor => actor.Nome).join(', ') : 'N/A';
            let genres = filme.genres ? filme.genres.map(genre => genre.designacao).join(', ') : 'N/A';

            let htmlContent = `
            <html>
            <head>
                <title>Informações do Filme</title>
            </head>
            <body>
                <h1>${filme.title}</h1>
                <p>ID: ${filme.id}</p>
                <p>Year: ${filme.year}</p>
                <p>Cast: ${cast}</p>
                <p>Géneros: ${genres}</p>
                <h6><a href="/">Voltar</a></h6> 
            </body>
            </html>`;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
            res.end(htmlContent); 
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' }); 
            res.end("Filme não encontrado"); 
        }
    }).catch(erro => { 
        console.log("Erro: " + erro); 
    }); 
    } else if(q.pathname == "/atores"){
        // Lista cidades
    axios.get("http://localhost:3000/atores")
    .then(resp => {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'})
            let lista = resp.data
            res.write("<h1>Lista de atores</h1>")
            res.write("<ul>")
            for(i in lista){
                res.write(`<li><a href="/atores/${lista[i].id}">${lista[i].Nome}</a></li>`);
            }
            res.write("</ul>")
            res.write("<h6><a href='/'>Voltar</a></h6>")
            res.end()
        }).catch( erro =>{
            console.log("Erro: " + erro);
        });
    }
     else if (q.pathname.startsWith("/atores/")) { 
        var alunoId = q.pathname.substring(8); 
        axios.get("http://localhost:3000/atores/" + alunoId)
            .then((resp) => { 
        let ator = resp.data;
        if (ator) {
            let htmlContent = `
            <html>
            <head>
                <title>Informações do ator</title>
            </head>
            <body>
                <h1>${ator.Nome}</h1>
                <p>ID: ${ator.id}</p>
                <p>Nome: ${ator.Nome}</p>
                <h6><a href="/">Voltar</a></h6> 
            </body>
            </html>`;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
            res.end(htmlContent); 
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' }); 
            res.end("Filme não encontrado"); 
        }
    }).catch(erro => { 
        console.log("Erro: " + erro); 
    }); }
 else if(q.pathname == "/generos"){
    // Lista cidades
        axios.get("http://localhost:3000/generos")
        .then(resp => {
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'})
                let lista = resp.data
                res.write("<h1>Lista de generos</h1>")
                res.write("<ul>")
                for(i in lista){
                    res.write(`<li><a href="/generos/${lista[i].id}">${lista[i].designacao}</a></li>`);
                }
                res.write("</ul>")
                res.write("<h6><a href='/'>Voltar</a></h6>")
                res.end()
            }).catch( erro =>{
                console.log("Erro: " + erro);
            });
        }
 else if (q.pathname.startsWith("/generos/")) { 
        var generoID = q.pathname.substring(9); 
        axios.get("http://localhost:3000/generos/" + generoID)
            .then((resp) => { 
        let genero = resp.data;
        if (genero) {
            let htmlContent = `
            <html>
            <head>
                <title>Informações do género</title>
            </head>
            <body>
                <h1>${genero.designacao}</h1>
                <p>ID: ${genero.id}</p>
                <p>Nome: ${genero.designacao}</p>
                <h6><a href="/">Voltar</a></h6> 
            </body>
            </html>`;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
            res.end(htmlContent); 
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' }); 
            res.end("Filme não encontrado"); 
        }
    }).catch(erro => { 
        console.log("Erro: " + erro); 
    }); }
            else {
                // Caso o caminho não seja encontrado
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("404 - Página não encontrada");
            }

}).listen(2602); 

console.log("Servidor à escuta na porta 2602...");