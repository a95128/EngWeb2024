import sys
import json

def processar_linha(linha):
    try:
        objeto_json = json.loads(linha)
        return objeto_json
    except json.JSONDecodeError:
        print("Erro ao decodificar JSON:", linha)
        return None

def ler_arquivo_json(caminho_arquivo):
    try:
        with open(caminho_arquivo, 'r') as arquivo:
            return [processar_linha(linha) for linha in arquivo]
    except FileNotFoundError:
        print(f"O arquivo '{caminho_arquivo}' não pôde ser encontrado.")
        return None

def calc_genres_ids(filmes):
    generos_ids = {}
    contador = 1
    for filme in filmes:
        if "genres" in filme:
            for genero in filme["genres"]:
                if genero not in generos_ids:
                    generos_ids[genero] = f"g{contador}"
                    contador += 1
    return generos_ids

def calc_actors_ids(filmes):
    atores_ids = {}
    contador = 1
    for filme in filmes:
        for ator in filme["cast"]:
            if ator not in atores_ids:
                atores_ids[ator] = f"a{contador}"
                contador += 1
    return atores_ids

def calc_movies(filmes, atores_ids, generos_ids):
    filmes_modificados = []
    for filme in filmes:
        # Modificar a estrutura do filme conforme necessário
        filme_modificado = {
            "id": filme["_id"]["$oid"],  
            "title": filme["title"],  
            "year": filme["year"],  
            "cast": [{"id": atores_ids[ator], "Nome": ator} for ator in filme["cast"]], 
            "genres": [{"id": generos_ids[genero], "designacao": genero} for genero in filme.get("genres", [])], 
        }
        filmes_modificados.append(filme_modificado)
    
    return filmes_modificados

def criar_dicionario_autores(atores_ids):
    return [{"id": id_ator, "Nome": ator} for ator, id_ator in atores_ids.items()]

def criar_dicionario_generos(generos_ids):
    return [{"id": id_genero, "designacao": genero} for genero, id_genero in generos_ids.items()]

file_path = "filmes.json"
myDB = ler_arquivo_json(file_path)

if myDB:
    atores_ids = calc_actors_ids(myDB)
    generos_ids = calc_genres_ids(myDB)
    filmes_modificados = calc_movies(myDB, atores_ids, generos_ids)
    
    autores_dicionario = criar_dicionario_autores(atores_ids)
    generos_dicionario = criar_dicionario_generos(generos_ids)
    
    novaDB = {
        "filmes": filmes_modificados,
        "atores": autores_dicionario,
        "generos": generos_dicionario
    }

    # Exportar para um JSON
f=open("newdataset.json","w")
json.dump(novaDB, f,indent=4)
f.close()