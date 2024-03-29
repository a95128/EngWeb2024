const http = require('http');
var fs = require('fs')
const url = require('url');
const axios = require('axios');


http.createServer((req, res) => {
    console.log(req.method + " " + req.url + " ");

    const q = url.parse(req.url, true);

    if(q.pathname == "/") {
        // Display options
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.write("<h1>Escolha uma opção</h1>");
        res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
        res.write("<ul>");
        res.write("<li><a href='/filmes'>Ver Filmes</a></li>");
        res.write("<li><a href='/atores'>Ver Atores</a></li>");
        res.write("<li><a href='/generos'>Ver Géneros</a></li>");
        res.write("</ul>");
        res.end();
    } else if(q.pathname == "/filmes") {
        // List movies
        axios.get("http://localhost:3000/filmes")
            .then(resp => {
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
                let lista = resp.data;
                res.write("<h1>Lista de filmes</h1>");
                res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
                res.write("<ul>");
                for(let i in lista){
                    res.write(`<li><a href="/filmes/${lista[i].id}">${lista[i].title}</a></li>`);
                }
                res.write("</ul>");
                res.write("<h6><a href='/'>Voltar</a></h6>");
                res.end();
            }).catch( erro =>{
                console.log("Erro: " + erro);
            });
    } else if (q.pathname.startsWith("/filmes/")) { 
        var alunoId = q.pathname.substring(8); 
        axios.get("http://localhost:3000/filmes/" + alunoId)
            .then((resp) => { 
        let filme = resp.data;
        if (filme) {
            let cast = filme.cast ? filme.cast.map(actor => `<a href="/atores/${actor.id}">${actor.Nome}</a>`).join(', ') : 'N/A';
            let genres = filme.genres ? filme.genres.map(genre => `<a href="/generos/${genre.id}">${genre.designacao}</a>`).join(', ') : 'N/A';
            let htmlContent = `
            <html>
            <head>
                <title>Informações do Filme</title>
                <link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>
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
        // List actors
        axios.get("http://localhost:3000/atores")
            .then(resp => {
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
                let lista = resp.data;
                res.write("<h1>Lista de atores</h1>");
                res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
                res.write("<ul>");
                for(let i in lista){
                    res.write(`<li><a href="/atores/${lista[i].id}">${lista[i].Nome}</a></li>`);
                }
                res.write("</ul>");
                res.write("<h6><a href='/'>Voltar</a></h6>");
                res.end();
            }).catch( erro =>{
                console.log("Erro: " + erro);
            });
    } else if (q.pathname.startsWith("/atores/")) { 
        // Display individual actor
        let actorId = q.pathname.substring(8); 
        axios.get("http://localhost:3000/atores/" + actorId)
            .then((resp) => { 
                const actor = resp.data;
                if (actor) {
                    const htmlContent = `
                    <html>
                    <head>
                        <title>Informações do ator</title>
                        <link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>
                    </head>
                    <body>
                        <h1>${actor.Nome}</h1>
                        <p>ID: ${actor.id}</p>
                        <p>Nome: ${actor.Nome}</p>
                        <h6><a href="/">Voltar</a></h6> 
                    </body>
                    </html>`;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
                    res.end(htmlContent); 
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' }); 
                    res.end("Ator não encontrado"); 
                }
            }).catch(erro => { 
                console.log("Erro: " + erro); 
            }); 
    } else if(q.pathname == "/generos"){
        // List genres
        axios.get("http://localhost:3000/generos")
            .then(resp => {
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
                let lista = resp.data;
                res.write("<h1>Lista de gêneros</h1>");
                res.write("<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
                res.write("<ul>");
                for(let i in lista){
                    res.write(`<li><a href="/generos/${lista[i].id}">${lista[i].designacao}</a></li>`);
                }
                res.write("</ul>");
                res.write("<h6><a href='/'>Voltar</a></h6>");
                res.end();
            }).catch( erro =>{
                console.log("Erro: " + erro);
            });
    } else if (q.pathname.startsWith("/generos/")) { 
        // Display individual genre
        let genreID = q.pathname.substring(9); 
        axios.get("http://localhost:3000/generos/" + genreID)
            .then((resp) => { 
                const genre = resp.data;
                if (genre) {
                    const htmlContent = `
                    <html>
                    <head>
                        <title>Informações do gênero</title>
                        <link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>
                    </head>
                    <body>
                        <h1>${genre.designacao}</h1>
                        <p>ID: ${genre.id}</p>
                        <p>Nome: ${genre.designacao}</p>
                        <h6><a href="/">Voltar</a></h6> 
                    </body>
                    </html>`;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' }); 
                    res.end(htmlContent); 
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' }); 
                    res.end("Género não encontrado"); 
                }
            }).catch(erro => { 
                console.log("Erro: " + erro); 
            }); 
    } else if (q.pathname == "/w3.css") {
        fs.readFile('w3.css', (erro, dados) => {
            if (erro) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end("Erro ao ler o arquivo CSS");
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(dados);
            res.end();
        })
    } else {
        // If the path is not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 - Página não encontrada");
    }

}).listen(2602); 

console.log("Servidor à escuta na porta 2602...");
