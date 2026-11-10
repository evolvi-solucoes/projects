# ADR 0002: Página pública só com resumo de negócio

*Architecture Decision Record*.

**Status:** aceito, 10/11/2026

## Contexto

O GitHub Pages do plano gratuito é sempre público. Qualquer pessoa na internet pode ler a página.

A documentação interna das automações cita endereços de rede, caminhos do servidor, usuários e clientes.

## Decisão

Publicar a página como pública. Mostrar só o nome, o link do repositório, o resumo de negócio e os selos.

Não publicar endereço IP, caminho de rede, nome de cliente, nome de pessoa ou segredo. A skill `portfolio-sistemas` confere essa regra antes de cada inclusão.

Os repositórios das automações podem ser privados. O link pede login a quem não tem acesso.

## Alternativas descartadas
- Página privada com GitHub Enterprise Cloud: exige plano pago.
- Página interna no servidor: exige rede interna para consultar.

## Consequências
- Positiva: a equipe consulta a página de qualquer lugar, sem login.
- Negativa: a lista de automações e os sistemas usados ficam públicos.
- Negativa: um resumo mal escrito pode expor dado interno. A revisão da skill reduz esse risco.
