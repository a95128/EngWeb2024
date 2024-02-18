# TPC1

Enunciado do primeiro TPC da UC de Engenharia Web
## Enunciado 

**Objetivo:** criar um página HTML capaz de gerar informações sobre diversas ruas de braga e associar as respetivas imagens

**Material** Pasta fornecida em https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2024/

**Tópicos:**  
Seguidamente encontra-se uma breve descrição da lógica do código e do seu funcionamento. 

- Itera sobre os arquivos no diretório especificado (diretoria_xml), filtrando apenas os arquivos com extensão .xml.

- Para cada arquivo XML encontrado, o código realiza várias ações:
   - Lê o nome e o número da rua do arquivo XML.
   - Cria um arquivo HTML correspondente ao nome da rua.
   - Adiciona imagens da rua desenhada e atual ao arquivo HTML.
   - Adiciona descrições da rua ao arquivo HTML.
   - Adiciona uma lista de casas ao arquivo HTML.
   - Adiciona um link de volta para a página principal ao arquivo HTML.

- Ordena a lista de ruas (listaruas) com base no ID convertido para inteiro.

- Para cada rua na lista ordenada, o código cria um link HTML na forma de uma lista ordenada. 

- O código fecha as tags HTML necessárias para concluir o arquivo HTML principal.

- Ele escreve o conteúdo HTML gerado em um arquivo HTML principal chamado "maparuas.html".