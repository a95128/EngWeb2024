# TPC2

Enunciado do segundo TPC da UC de Engenharia Web

## Enunciado 

**Objetivo:** criar um página HTML capaz de gerar informações sobre alunos, instrumentos e cursos
**Material** Dataset fornecido em: https://epl.di.uminho.pt/~jcr/TRANSF/db.json

**Tópicos:**  

Este código servidor.js é um servidor HTTP que utiliza os módulos http, url e axios. Ele cria um servidor que escuta na porta 1902 e responde a diferentes rotas com base nos pedidos recebidos.

Mais concretamente:

   - Importa os módulos necessários: http, url e axios.
   - Cria um servidor HTTP usando http.createServer().
   - Define um callback para lidar com os pedidos HTTP recebidos pelo servidor.
   - Analisa a URL do pedido usando o módulo url.
   - Se a rota for /, o servidor responde com uma página HTML que contém links para diferentes recursos (/alunos, /instrumentos e /cursos).
   - Se a rota for /alunos, o servidor faz uma solicitação GET para um servidor REST local na porta 3000 que fornece uma lista de alunos. Ele então gera uma página HTML com uma lista de alunos e links para ver detalhes de cada aluno.
   - Se a rota for /alunos/{id}, o servidor faz uma solicitação GET para obter detalhes específicos do aluno com o ID fornecido e gera uma página HTML com esses detalhes.
   - O mesmo padrão é seguido para as rotas /instrumentos, /instrumentos/{id}, /cursos e /cursos/{id}.
   - Se a rota não for reconhecida, o servidor responde com um código de status 404 e uma mensagem "404 - Página não encontrada".