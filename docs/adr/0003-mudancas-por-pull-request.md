# ADR 0003: Mudanças por pull request

*Architecture Decision Record*.

**Status:** aceito, 10/11/2026

## Contexto

O GitHub Pages publica a branch `main`. Um push direto na `main` publica a mudança sem revisão.

A Coordenação de TI precisa aprovar toda mudança. O projeto não tem um ambiente de teste separado.

## Decisão

Fazer toda mudança numa branch própria. Abrir um pull request para a `main`. Fazer o merge só depois da aprovação da Coordenação de TI.

Usar **Rebase and merge** no merge. Desfazer mudanças com `git revert`, também por pull request.

O teste antes do merge acontece no servidor local, com os testes de borda de `docs/testes.md`.

## Alternativas descartadas
- Push direto na `main`: publica sem revisão e sem aprovação.
- Ambiente de teste com um segundo repositório no GitHub Pages: duplica o código e a manutenção para uma página simples.
- Merge com **Squash and merge**: junta os commits pequenos num commit só.

## Consequências
- Positiva: toda mudança tem revisão e aprovação registradas no pull request.
- Positiva: o `git revert` desfaz uma mudança sem reescrever o histórico.
- Negativa: uma correção urgente também espera a aprovação. Para dado exposto, pare a página primeiro.
- Negativa: sem proteção da branch `main` no GitHub, o fluxo depende da disciplina da equipe.
