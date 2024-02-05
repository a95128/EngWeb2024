import os

# Criar 8 pastas de TPC
# Criar Pasta de projeto
# Criar Pasta de Teste
# Criar ficheiro .gitkeep dentro de cada pasta

# Mudar de Diretoria
# os.chdir('./EngWeb2024')

nome = "TPC"

for i in range(8):
    nomePasta = f"{nome}{i+1}" # nome + str(i+1)
    # Criar a pasta
    os.mkdir(nomePasta)
    open(f"{nomePasta}/.gitkeep", "w")


nomePasta = "Teste"
os.mkdir(nomePasta)
open(f"{nomePasta}/.gitkeep", "w")

nomePasta = "Projeto"
os.mkdir(nomePasta)
open(f"{nomePasta}/.gitkeep", "w")