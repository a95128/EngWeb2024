import json


html="""
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>
"""

file= opne("mapa.json","r").read()

result = json.loads(file)

html +="<ul>"

for elem in result["cidades"]:
    html +=f'{elem["nome"]}</li>'

html+="</ul>"
