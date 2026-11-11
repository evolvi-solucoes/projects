# ADR 0004: Situação e datas no JSON

*Architecture Decision Record*.

**Status:** aceito, 11/11/2026

## Contexto

O portfólio passou a mostrar os projetos desde o início, e não só as automações em produção.

A skill `projeto` registra o início de um projeto e cada mudança de situação.

No futuro, integrações vão avisar outros sistemas que um projeto foi iniciado ou mudou.

## Decisão

Incluir três campos em cada projeto do `projetos.json`:

- `situacao`: obrigatório. Valores: `andamento`, `producao`, `pausado` ou `desativado`.
- `iniciado_em`: opcional. Data de início no formato `AAAA-MM-DD`.
- `atualizado_em`: opcional. Data da última mudança no formato `AAAA-MM-DD`.

A página mostra a situação como selo e permite filtrar por ela. A página ignora o projeto com data fora do formato.

Uma integração futura lê o `projetos.json` publicado. A skill `projeto` tem o passo "Avisar integrações", hoje sem ação.

## Alternativas descartadas
- Mostrar só as automações em produção: não mostra que um projeto começou.
- Guardar a situação fora do JSON, por exemplo em issues do GitHub: separa os dados da página e exige outra fonte para as integrações.
- Criar a integração agora: ainda não existe destino definido.

## Consequências
- Positiva: a página mostra a evolução de cada projeto.
- Positiva: o JSON público já tem os dados que uma integração precisa.
- Negativa: a situação depende de a equipe rodar a skill `projeto` a cada mudança.
- Negativa: as 16 automações antigas não têm data de início. Os campos ficam vazios até alguém informar a data.
