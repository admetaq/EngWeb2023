import json
import os

def ordCidade(c):
    return c['nome'] 
    
f = open("mapa.json")


mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
ligacoes = mapa['ligações']

mapaDistritos = {}
mapaCidades = {}
mapaLigacoes = {}



for cidade in cidades:
    if cidade['distrito'] not in mapaDistritos:
        mapaDistritos[cidade['distrito']] = [cidade]
    else:
        mapaDistritos[cidade['distrito']].append(cidade)
        
    mapaCidades[cidade['id']] = cidade



for ligacao in ligacoes:
    if ligacao['origem'] in mapaLigacoes:
        mapaLigacoes[ligacao['origem']].append(ligacao)
    else:
        mapaLigacoes[ligacao['origem']] = [ligacao]



distritos = list(mapaDistritos.keys())
distritos.sort()

if not os.path.exists("Cidades"):
    os.makedirs("Cidades")
    
index = open("Cidades/index.html", 'w')

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!-- Índice -->
                    <a name="indice"/>
                    <h2>Índice</h2>
            </tr>
                    
"""
for d in distritos:
    pagHTML+= f"""
    <tr>
        <h4>{d}</h4>
        <ul>
    """
    cidadesD = list(mapaDistritos[d])
    cidadesD.sort(key = ordCidade)
    for c in cidadesD:
        pagHTML += f"""
        <li>
            <a href="{c['id']}">{c['nome']}</a>
        </li>"""
    pagHTML += """</tr>"""
    
pagHTML += """

            </tr>
        </table>
    </body>
</html>
"""

index.write(pagHTML)
index.close()


for c in cidades:
    cidade = open("Cidades/" + c['id'] +".html", 'w')
    pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <td valign="top">"""
                
    pagHTML += f"""
    <a name="{c['id']}"/>
        <h3>{c['nome']}</h3>
        <p><b>"População": {c['população']}</b></p>
        <p><b>"Descrição": {c['descrição']}</b></p>
        <p><b>"Distrito": {c['distrito']}</b></p>
        <p>Ligações:</p>
        <ul>
            """
    if c['id'] in mapaLigacoes:
        ligacoesC = mapaLigacoes[c['id']] 
        ligacoesC.sort(key = lambda l : l['distância'])     
        for ligacao in ligacoesC:
            pagHTML += f""" 
                <li>{mapaCidades[ligacao['destino']]['nome']}: {ligacao['distância']} km</li> """
    
    
    pagHTML+=f"""
                </ul>
                <address>[<a href="/">Voltar ao índice] 
                <center>
            <hr width="80%"/>
        </center> """
        
    pagHTML+=f"""
                </td>
            </tr>
        </table>
    </body>
</html>
"""
    cidade.write(pagHTML)
    cidade.close()
