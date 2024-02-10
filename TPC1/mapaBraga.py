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

html += "<ul>"

listaruas = []
for file in os.listdir(diretoria_xml):
    if file.endswith('.xml'):
        # Abre o arquivo XML e analisa seu conteúdo
        tree = ET.parse(os.path.join(diretoria_xml, file))
        root = tree.getroot()
        rua = root.find('.//nome').text
        listaruas.append(rua)
        htmlfile = open(f"html/{rua}.html", "w", encoding="utf-8")
        htmlfile.write(f"<h1>{rua}</h1>")

        # Adiciona as fotos da rua ao HTML
        htmlfile.write("<div>")
        for figura in root.findall('.//figura'):
            imagem_path = figura.find('./imagem').attrib['path']
            legenda = figura.find('./legenda').text
            imagem_html = f'<img src="../{diretoria_imagens}/{imagem_path}" alt="{legenda}" width="800" height="400">'
            htmlfile.write(imagem_html)
            htmlfile.write(f'<p>{legenda}</p>')

        # Adiciona as descrições das ruas ao HTML
        descricao = ""
        for para_element in root.findall("./corpo/para"):
            texto_para = ET.tostring(para_element, encoding='unicode', method='text').strip()
            descricao += texto_para + " "

        htmlfile.write(f"<div class='descricao'><b>Descrição: </b>{descricao}</div>")

        # Adiciona o link de volta para a página principal
        htmlfile.write('<h6><a href="../maparuas.html">Voltar</a></h6>')
        
        htmlfile.close()


for rua in sorted(listaruas):
    html += f'<li><a href="html/{rua}.html">{rua}</a></li>'

html += "</ul>"
html += "</body>"

htmlfile = open("maparuas.html", "w", encoding="utf-8")
htmlfile.write(html)
htmlfile.close()
