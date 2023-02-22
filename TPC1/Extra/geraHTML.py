import json

def ordCidade(c):
    return c['nome'] 
    
f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
ligacoes = mapa['ligações']

mapaCidades = {}
mapaLigacoes = {}

for cidade in cidades:
    mapaCidades[cidade['id']] = cidade

for ligacao in ligacoes:
    if ligacao['origem'] in mapaLigacoes:
        mapaLigacoes[ligacao['origem']].append(ligacao)
    else:
        mapaLigacoes[ligacao['origem']] = [ligacao]

pagHTLM = """
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
                <td valign="top">
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ul>
"""

for c in cidades:
    pagHTLM += f"""
    <li>
        <a href="#{c['id']}">{c['nome']}</a>
        </li>"""
    
pagHTLM += """
</ul>
    </td>
    <!-- Conteúdo -->
    <td>
"""

for c in cidades:
    pagHTLM += f"""
    <a name="{c['id']}"/>
        <h3>{c['nome']}</h3>
        <p><b>"População": {c['população']}</b></p>
        <p><b>"Descrição": {c['descrição']}</b></p>
        <p><b>"Distrito": {c['distrito']}</b></p>
        <p>Ligações:</p>
        <ul>
              """
    if c['id'] in mapaLigacoes:          
        for ligacao in mapaLigacoes[c['id']]:
            pagHTLM += f""" 
                <li>{mapaCidades[ligacao['destino']]['nome']}: {ligacao['distância']} km</li> """
    
    pagHTLM+=f"""
                </ul>
                <address>[<a href="#indice">Voltar ao índice] 
                <center>
            <hr width="80%"/>
        </center>    
    """
    
pagHTLM += """
</td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTLM)
