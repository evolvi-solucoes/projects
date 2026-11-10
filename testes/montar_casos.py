import json
import shutil
import sys
from pathlib import Path

ARQUIVOS_DA_PAGINA = ("index.html", "estilo.css", "app.js")

BASE = {
    "id": "teste",
    "nome": "Projeto de teste",
    "repositorio": "https://github.com/exemplo/teste",
    "resumo": "Resumo de teste.",
    "area": "Fiscal",
    "execucao": "Serviço",
    "documentacao": "completa",
    "publicado": True,
}


def projeto(**campos):
    return {**BASE, **campos}


def lista(*projetos):
    return {
        "areas": ["Fiscal", "Financeiro"],
        "atualizado_em": "2026-11-10",
        "projetos": list(projetos),
    }


def link(id_, url):
    return projeto(id=id_, nome=id_, repositorio=url)


# Dados falsos: os casos não usam nenhum projeto real.
CASOS = {
    "json-invalido": '{ "projetos": [',
    "sem-arquivo": None,
    "sem-chave-projetos": {"areas": ["Fiscal"]},
    "lista-vazia": lista(),
    "campos-vazios": lista(projeto(id="a", nome="", resumo="")),
    "campos-ausentes": lista(
        {"id": "b", "repositorio": "https://github.com/exemplo/b"},
    ),
    "links-invalidos": lista(
        projeto(id="ok", nome="Valido"),
        link("js", "javascript:alert(1)"),
        link("externo", "https://evil.example/x"),
        link("parecido", "https://github.com.evil.example/x"),
        link("sem-https", "http://github.com/exemplo/x"),
        link("numero", 123),
    ),
    "html-no-texto": lista(projeto(
        nome="<img src=x onerror=\"document.title='XSS'\">",
        resumo="<script>document.title='XSS'</script><b>negrito</b>",
        area="<i>Fiscal</i>",
    )),
    "texto-longo": lista(projeto(
        nome="N" * 120,
        resumo=("Palavra " * 300) + "X" * 200,
    )),
    "acentos": lista(projeto(
        nome="Ação fiscal çãõ",
        resumo="Emissão de guias de ISSQN e conferência.",
    )),
    "id-duplicado": lista(
        projeto(id="dup", nome="Primeiro"),
        projeto(id="dup", nome="Segundo"),
    ),
    "area-fora-da-lista": lista(projeto(nome="Area nova", area="Jurídico")),
    "valores-estranhos": lista(
        projeto(documentacao="xyz", publicado="false", execucao=""),
    ),
    "volume-500": lista(*[
        projeto(id=f"p{i}", nome=f"Projeto {i:03d}") for i in range(500)
    ]),
}


def montar(origem, destino):
    if destino.exists():
        shutil.rmtree(destino)
    for nome, conteudo in CASOS.items():
        pasta = destino / nome
        pasta.mkdir(parents=True)
        for arquivo in ARQUIVOS_DA_PAGINA:
            shutil.copy(origem / arquivo, pasta / arquivo)
        if conteudo is None:
            continue
        if isinstance(conteudo, str):
            texto = conteudo
        else:
            texto = json.dumps(conteudo, ensure_ascii=False)
        (pasta / "projetos.json").write_text(texto, encoding="utf-8")


if __name__ == "__main__":
    montar(Path(sys.argv[1]), Path(sys.argv[2]))
    print("\n".join(CASOS))
