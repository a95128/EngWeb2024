import json

def criar_dicionario_periodos(compositores):
    periodos = set(compositor["periodo"] for compositor in compositores)
    periodos_com_ids = [{"id": f"P{i}", "periodo": periodo} for i, periodo in enumerate(periodos, start=1)]
    return periodos_com_ids

def ler_arquivo_json(caminho_arquivo):
    try:
        with open(caminho_arquivo, 'r') as arquivo:
            return json.load(arquivo)["compositores"]
    except FileNotFoundError:
        print(f"O arquivo '{caminho_arquivo}' não pôde ser encontrado.")
        return None

file_path = "compositores.json"
compositores_data = ler_arquivo_json(file_path)

if compositores_data:
    periodos_dicionario = criar_dicionario_periodos(compositores_data)
    
    novaDB = {
        "compositores": compositores_data,
        "periodos": periodos_dicionario
    }

    # Exportar para um JSON
    with open("novocompositores.json", "w") as f:
        json.dump(novaDB, f, indent=4)
