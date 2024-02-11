import xml.etree.ElementTree as ET
import os

html = """
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Mapa</title>
    <meta charset="utf-8">
</head>
<body>
"""

diretoria_xml = "./MapaRuas-materialBase/texto"
diretoria_imagens = "./MapaRuas-materialBase/imagem"
diretoria_imagensatual = "./MapaRuas-materialBase/atual"

html += "<ul>"

listaruas = []
for file in os.listdir(diretoria_xml):
    if file.endswith('.xml'):
        # Abre o arquivo XML e analisa o seu conteúdo
        tree = ET.parse(os.path.join(diretoria_xml, file))
        root = tree.getroot()
        rua = root.find('.//nome').text.strip()
        id = root.find('.//número').text
        listaruas.append(rua)
        htmlfile = open(f"html/{rua}.html", "w", encoding="utf-8")
        htmlfile.write(f"<h1>{rua}</h1>")

        # Adiciona as fotos da rua desenho ao HTML

        for figura in root.findall('.//figura'):
            imagem_path = figura.find('./imagem').attrib['path']
            legenda = figura.find('./legenda').text
            imagem_html = f'<img src="../{diretoria_imagens}/{imagem_path}" alt="{legenda}" width="800" height="400">'
            htmlfile.write(imagem_html)
            htmlfile.write(f'<p>Legenda:{legenda}</p>')

        # Adiciona as fotos da rua atual ao HTML

        for vista_numero in ['Vista1', 'Vista2']:
            nome_rua = rua.replace(" ", "")
            imagematual_nome = f"{id}-{nome_rua}-{vista_numero}.JPG"
            # Verifica se o arquivo da imagem atual existe no diretório de imagens atual
            imagematual_path = os.path.join(diretoria_imagensatual, imagematual_nome)
            if os.path.exists(imagematual_path):
                # Se existir, escreve a tag HTML para a imagem no arquivo HTML
                imagem_htmlatual = f'<img src="../{diretoria_imagensatual}/{imagematual_nome}" width="800" height="400">'
                htmlfile.write(imagem_htmlatual)
                htmlfile.write(f'<p>Legenda:Rua Atual</p>')

        # Adiciona as descrições das ruas ao HTML
        
        descricao = ""
        for para_element in root.findall("./corpo/para"):
            texto_para = ET.tostring(para_element, encoding='unicode', method='text').strip()
            descricao += texto_para + " "
        htmlfile.write(f"<div class='descricao'><b>Descrição: </b>{descricao}</div>")


        #Adiciona lista de casas
        htmlfile.write("<h2>Lista de Casas</h2>")
        descricao_casa = ""
        for casa in root.findall("./corpo/lista-casas/casa"):    
            numero = casa.find("número").text
            enfiteuta_aux = casa.find("enfiteuta")
            enfiteuta = enfiteuta_aux.text if enfiteuta_aux is not None else "Não disponível"
            foro_aux = casa.find("foro")
            foro = foro_aux.text if foro_aux is not None else "Não disponível"
            desc_aux = casa.find("desc")
            desc = ET.tostring(desc_aux, encoding='unicode', method='text').strip() if desc_aux is not None else "Não disponível"
            descricao_casa += f"<p><b>Número:</b> {numero}, <b>Enfiteuta:</b> {enfiteuta},<b>Foro:</b> {foro}, <b>Descrição:</b> {desc} <br></p>"
        htmlfile.write(descricao_casa)

            
        # Adiciona o link de volta para a página principal
        htmlfile.write('<h6><a href="../maparuas.html">Voltar</a></h6>')
        
        htmlfile.close()

sorted_listaruas = sorted(listaruas.lower() for listaruas in listaruas)

for rua in sorted_listaruas:
    html += f'<li><a href="html/{rua}.html">{rua}</a></li>'

html += "</ul>"
html += "</body>"

htmlfile = open("maparuas.html", "w", encoding="utf-8")
htmlfile.write(html)
htmlfile.close()
