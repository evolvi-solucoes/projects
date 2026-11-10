# ADR 0001: Página estática com lista em JSON

*Architecture Decision Record*.

**Status:** aceito, 10/11/2026

## Contexto

O portfólio precisa listar as automações e ser fácil de manter. Uma skill vai incluir os projetos no padrão certo.

O GitHub Pages publica arquivos estáticos sem custo.

## Decisão

Usar HTML, CSS e JavaScript puros. Guardar a lista no arquivo `projetos.json`. O `app.js` lê o arquivo e monta a página no navegador.

O arquivo `.nojekyll` desliga o Jekyll do GitHub Pages.

## Alternativas descartadas
- Jekyll com `_data/projetos.yml`: o teste local exige Ruby. O YAML aceita erros de indentação difíceis de ver.
- Gerador de site com etapa de build (por exemplo, Astro ou Next.js): exige Node.js e uma ação de build para uma lista simples.
- Lista escrita direto no HTML: mistura dado e estrutura. A skill teria de editar HTML.

## Consequências
- Positiva: nenhuma dependência e nenhuma etapa de build.
- Positiva: a skill altera só um arquivo de dados com formato fixo.
- Negativa: a página depende de JavaScript. Sem JavaScript, a lista não aparece.
- Negativa: abrir o `index.html` direto do disco não funciona. O teste exige um servidor local.
